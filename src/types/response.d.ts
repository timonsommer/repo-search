import { Alert } from "./Status";

export type ResponseData = {
  user?: {
    repositories: {
      totalCount: number,
      edges: {
        cursor: string,
        node: {
          name: string,
          url: string,
          languages: {
            edges: {
              node: {
                id: string,
                name: string
              }
            }[],
          }
        }[],
        pageInfo: {
          endCursor: string,
          hasNextPage: boolean,
        }
      },
    }
  }
}

export type ResponseResult = { status: Alert, data?: ResponseData }