import axios from "axios";
import {FindRepository, IContributor, PagingItems, SearchRepositories} from "../types/github";

const CONTRIBUTORS_PER_PAGE = 10;

const instance = axios.create({
    baseURL: 'https://api.github.com/',
});

instance.interceptors.response.use(({ data }) => data);

export const RepositoriesAPI = {
    getRepositories(valueSearch: string, currentPage: number, pageSize: number): Promise<PagingItems<SearchRepositories.IRepository>> {
        return instance.get(`search/repositories?q=${valueSearch}+in:name&page=${currentPage}&per_page=${pageSize}&sort=stars`)
    },
    getTopRepositories(currentPage: number, pageSize: number): Promise<PagingItems<SearchRepositories.IRepository>> {
        return instance.get(`search/repositories?q=stars:>0&sort=stars&page=${currentPage}&per_page=${pageSize}`)
    },
    getContributors(url: string): Promise<IContributor[]> {
        return instance.get(`${url}?per_page=${CONTRIBUTORS_PER_PAGE}`)
    },
    getRepository(id: number | string): Promise<FindRepository.IRepository> {
        return instance.get(`repositories/${id}`)
    }
};
