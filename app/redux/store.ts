import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import taskReducer from "./TasksSlice";

const reducers = combineReducers({
    taskReducer
})

export const store = configureStore({
    reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;