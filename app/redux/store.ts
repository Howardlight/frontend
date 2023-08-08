import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import taskReducer from "./TasksSlice";
import { taskApi } from "./services/taskApi";

const reducers = combineReducers({
    taskReducer,
    [taskApi.reducerPath]: taskApi.reducer
})

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== `production`,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([taskApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;