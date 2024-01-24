import { GraphqlResponseError } from "@octokit/graphql";
import type { ResponseData, ResponseResult } from "../types/response";
import { Status } from "../types/Status";
import { paginateGraphql } from "@octokit/plugin-paginate-graphql";
import { Octokit } from "@octokit/core";

const ENTRIES_PER_QUERY = 100;

// const authQuery = graphql.defaults({
//   headers: {
//     authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
//   },
// });

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
export async function fetchRepos(username: string, lastItem?: string): Promise<ResponseResult> {
  const query =
    `query fetchRepos($_username: String!, $_entriesPerPage: Int!, $cursor: String) {
      repositoryOwner(login: $_username) {
      repositories(first: $_entriesPerPage, after: $cursor) {
        edges {
          cursor
          node {
            id
            name
            url
            isFork
            languages(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`

  const params = {
    _username: username,
    _entriesPerPage: ENTRIES_PER_QUERY,
  };

  try {
    const response: ResponseData = await authQuery.graphql.paginate(query, params);

    if (response.repositoryOwner && response.repositoryOwner.repositories.edges.length === 0) {
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
