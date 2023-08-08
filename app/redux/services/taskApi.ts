import { Task } from "@/types/Task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TaskAPI = createApi({
    reducerPath: 'taskApi',
    // refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/"
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], null>({
            query: () => `task`
        }),
        updateTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: `task/edit/${task._id}`,
                method: "PUT",
                body: { ...task },
            }),
        }),
    }),
})

export const { useGetTasksQuery, useUpdateTaskMutation } = TaskAPI;