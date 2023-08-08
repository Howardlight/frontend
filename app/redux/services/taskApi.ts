import { Task } from "@/types/Task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TaskAPI = createApi({
    reducerPath: 'taskApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/"
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], null>({
            query: () => `task`
        }),
    }),
})

export const { useGetTasksQuery } = TaskAPI;