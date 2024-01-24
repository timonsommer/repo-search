import { Status } from "./Status";

export type ResponseData = {
  repositoryOwner: {
    repositories: {
      totalCount: number
      edges: {
        cursor: string,
        node: {
          id: string,
          name: string,
          url: string,
          isFork: boolean,
          languages: {
            edges: {
              node: {
                id: string,
                name: string
              }
            }[],
          }
        },
        pageInfo: {
          endCursor: string,
          hasNextPage: boolean,
        }
      }[],
    }
  }
}

export type ResponseResult = { status: Status, data?: ResponseData }