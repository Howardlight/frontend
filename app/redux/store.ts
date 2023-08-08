import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import taskReducer from "./TasksSlice";
import { TaskAPI } from "./services/taskApi";

const reducers = combineReducers({
    taskReducer,
    [TaskAPI.reducerPath]: TaskAPI.reducer
})

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== `production`,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([TaskAPI.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;