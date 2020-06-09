import {FindRepository, IContributor, SearchRepositories} from "./github";

export type CardElementType = {
    nameRepository: string,
    stargazers_count: number,
    endDateCommit: string,
    html_url: string,
    description: string,
    contributors: IContributor[],
    owner: FindRepository.IOwner,
    language: string,
}

export type CurrentCardElement = CardElementType | null

export type DataForRepositoriesPage = {
    list: SearchRepositories.IRepository[],
    pageSize: number,
    currentItemList: CurrentCardElement
    totalCount: number,
}