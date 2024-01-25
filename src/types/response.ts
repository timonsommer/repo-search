import { Status } from "./Status";

export type ResponseData = {
  result: {
    repoData: {
      repoCount: number
      repos: {
        repo: {
          id: string,
          name: string,
          url: string,
          isFork: boolean,
          languageData: {
            langs: {
              lang: {
                id: string,
                name: string
              }
            }[],
          }
        },
        pageInfo: {
          hasNextPage: boolean,
          endCursor: string,
        }
      }[],
    }
  }
}

export type ResponseResult = { status: Status, data?: ResponseData }