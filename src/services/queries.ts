import { GraphqlResponseError } from "@octokit/graphql";
import { type ResponseData, type ResponseResult } from "../types/response";
import { Status } from "../types/Status";
import { paginateGraphql } from "@octokit/plugin-paginate-graphql";
import { Octokit } from "@octokit/core";

// maximum query size imposed by the GitHub GraphQL API
const ENTRIES_PER_QUERY = 100;

export const ENTRIES_PER_PAGE = 10;

// send access token with each query (API requirement)
const AuthQuery = Octokit.plugin(paginateGraphql);
const authQuery = new AuthQuery({
  auth: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
});

/**
 * Attempts to fetch all public repositories owned by the provided user.
 * If the username exists, a fixed number of repositories are returned.
 * @param {string} username The username to fetch repositories from.
 * GitHub organization names are not supported.
 * @return {Promise<ResponseResult>} Contains a status code and, if the query was successful, the requested respositories.
 */
export async function fetchRepos(username: string): Promise<ResponseResult> {
  const query = `query fetchRepos($username: String!, $entriesPerQuery: Int!, $cursor: String) {
      result: user(login: $username) {
        repoData: repositories(
          first: $entriesPerQuery
          after: $cursor
          ownerAffiliations: OWNER
          orderBy: {field: UPDATED_AT, direction: DESC}
        ) {
          repoCount: totalCount
          edges {
            repo: node {
              id
              name
              url
              isFork
              languageData: languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                langs: edges {
                  lang: node {
                    id
                    name
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
  }`;

  const params = {
    username: username,
    entriesPerQuery: ENTRIES_PER_QUERY,
  };

  try {
    // combines pages into a single array
    const response: ResponseData = await authQuery.graphql.paginate(
      query,
      params
    );
    
    if (response.result && response.result.repoData.repoCount === 0) {
      // user has no public repositories
      return { status: Status.NO_ENTRIES };
    } else {
      return { status: Status.SUCCESS, data: response };
    }
  } catch (error: any) {
    console.log(error.message);

    if (error instanceof GraphqlResponseError) {
      if (
        error.message.includes("Could not resolve to a User with the login of")
        ) {
        // username does not exist or is organization handle
        return { status: Status.UNKNOWN_USER };
      } else {
        return { status: Status.QUERY_ERROR };
      }
    } else {
      return { status: Status.GENERAL_ERROR };
    }
  }
}
