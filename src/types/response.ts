import { Status } from "./Status";

export type ResponseData = {
  search: {
    repositoryCount: number;
    repos: {
      repo: {
        id: string,
        url: string,
        name: string,
        isFork: boolean,
        language: {
          name: string
        }
      }
    }[],
    pageInfo: {
      endCursor: string,
      hasNextPage: boolean
    }
  }
}

export type ResponseResult = { status: Status, data?: ResponseData }