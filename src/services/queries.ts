import { GraphqlResponseError } from "@octokit/graphql";
import type { ResponseData, ResponseResult } from "../types/response";
import { Status } from "../types/Status";
import { paginateGraphql } from "@octokit/plugin-paginate-graphql";
import { Octokit } from "@octokit/core";

const ENTRIES_PER_QUERY = 100;

const AuthQuery = Octokit.plugin(paginateGraphql);
const authQuery = new AuthQuery({ auth: `bearer ${process.env.REACT_APP_GH_TOKEN}` });


/**
 * Attempts to fetch all public repositories owned by the provided user.
 * If the username exists, a fixed number of repositories are returned.
 * @param {string} username The username to fetch repositories from.
 * GitHub organization names are not supported.
 * @param {string} username The GraphQL cursor marking the end of the previous page. Used for paginated queries.
 * @return {Promise<ResponseResult>} Contains a status code and, if the query was successful, the requested respositories.
 */
export async function fetchRepos(username: string): Promise<ResponseResult> {
  const query =
    `query fetchRepos($username: String!, $entriesPerPage: Int!, $cursor: String) {
      result: user(login: $username) {
        repoData: repositories(
          first: $entriesPerPage
          after: $cursor
          ownerAffiliations: OWNER
          orderBy: {field: UPDATED_AT, direction: DESC}
        ) {
          repoCount: totalCount
          repos: edges {
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
  }`

  const params = {
    username: username,
    entriesPerPage: ENTRIES_PER_QUERY,
  };

  try {
    const response: ResponseData = await authQuery.graphql.paginate(query, params);

    // const response: ResponseData = {result: {repoData: {repos: []}}
    
    // for await ( const page of responseIter) {
    //   response.result.repoData.repos.concat
    // }

    console.log(response);

    if (response.result && response.result.repoData.repoCount === 0) {
      return { status: Status.NO_ENTRIES };
    } else {
      return { status: Status.SUCCESS, data: response };
    }

  } catch (error: any) {
    console.log(error.message);

    if (error instanceof GraphqlResponseError) {
      if (error.message.includes("Could not resolve to a User with the login of")) {
        return { status: Status.UNKNOWN_USER };
      } else {
        return { status: Status.QUERY_ERROR };
      }
    } else {
      return { status: Status.GENERAL_ERROR };
    }
  }
}
