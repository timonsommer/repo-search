import { GraphqlResponseError, graphql } from "@octokit/graphql";
import type { ResponseData, ResponseResult } from "../types/response";
import { Status } from "../types/Status";

const ENTRIES_PER_PAGE = 10;

const authQuery = graphql.defaults({
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
  },
});

/**
 * Attempts to fetch all public repositories owned by the provided user.
 * If the username exists, a fixed number of repositories are returned.
 * @param {string} username The username to fetch repositories from.
 * GitHub organization names are not supported.
 * @param {string} username The GraphQL cursor marking the end of the previous page. Used for paginated queries.
 * @return {Promise<ResponseResult>} Contains a status code and, if the query was successful, the requested respositories.
 */
export async function fetchRepos(username: string, lastItem?: string): Promise<ResponseResult> {
  const query = {
    query: `query fetchRepos($_username: String!, $_entriesPerPage: Int!, $_lastItem: String) {
    user(login: $_username) {
      repositories(first: $_entriesPerPage, after: $_lastItem) {
        totalCount
        edges {
          cursor
          node {
            name
            url
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
  }`,
    _username: username,
    _entriesPerPage: ENTRIES_PER_PAGE,
    _lastItem: lastItem,
  };

  try {
    const response: ResponseData = await authQuery(query);

    if (response.user && response.user.repositories.totalCount === 0) {
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
