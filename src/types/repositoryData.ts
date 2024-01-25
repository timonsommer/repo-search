export type Repository = {
    id: string,
    url: string,
    name: string,
    isFork: boolean
    language: string,
}

export type Filter = {
    language: string,
    repoName: string
}
