import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RepositoriesAPI} from "../api/api";
import {CurrentCardElement, DataForRepositoriesPage} from "../types";
import {AppDispatch} from "./store";
import {SearchRepositories} from "../types/github";

const initialState: DataForRepositoriesPage = {
    list: [],
    pageSize: 10,
    currentItemList: null,
    totalCount: 0
};

type PayloadLoadRepositories = {
    list: SearchRepositories.IRepository[],
    totalCount: number,
}

const currentRepositories = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        loadRepositories: (state, {payload: {list, totalCount}}: PayloadAction<PayloadLoadRepositories>) => {
            state.list = list;
            state.totalCount = totalCount
        },
        setCurrentItemList: (state, {payload}: PayloadAction<CurrentCardElement>) => {
            state.currentItemList = payload
        },
    }
});


const {actions, reducer: repositoriesReducer} = currentRepositories;

export const {loadRepositories, setCurrentItemList} = actions;

export const requestRepositories = (valueSearch: string, page = 1, pageSize = 10) => {
    if (!valueSearch) {
        return async (dispatch: AppDispatch) => {
            const {items: list, total_count: totalCount} = await RepositoriesAPI.getTopRepositories(page, pageSize);
            dispatch(loadRepositories({totalCount, list}))
        }
    } else {
        return async (dispatch: AppDispatch) => {
            const {total_count: totalCount, items: list} = await RepositoriesAPI.getRepositories(valueSearch, page, pageSize);
            dispatch(loadRepositories({totalCount, list}));
        }
    }
};

export default repositoriesReducer;