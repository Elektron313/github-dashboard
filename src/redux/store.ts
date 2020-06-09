import {configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import repositoriesReducer from "./repositoriesReducer";

const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true,
});

const reducers = combineReducers({
    repositoriesReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppStateType = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();