import { CreateTask, Task } from "@/types/Task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface findAllTasks {
    data: Task[],
    paging: {
        total: number,
        page: number,
        pages: number
    }
}

export const TaskAPI = createApi({
    reducerPath: 'taskApi',
    // refetchOnFocus: true,
    tagTypes: ["Task"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/"
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<findAllTasks, number>({
            query: (page) => `task?offset=${page}&limit=9`,
            providesTags: ["Task"]
        }),
        updateTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: `task/edit/${task._id}`,
                method: "PUT",
                body: { ...task },
            }),
            invalidatesTags: ["Task"]
        }),
        createTask: builder.mutation<Task, CreateTask>({
            query: (task) => ({
                url: `task/`,
                method: "POST",
                body: { ...task },
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation<Task, string>({
            query: (id) => ({
                url: `task/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"]
        }),
        markComplete: builder.mutation<Task, { complete: boolean, id: string }>({
            query: (payload) => ({
                url: `task/complete/${payload.id}`,
                method: "PUT",
                body: { isComplete: payload.complete }
            }),
            invalidatesTags: ["Task"]
        })
    }),
})

export const { useGetTasksQuery, useUpdateTaskMutation, useCreateTaskMutation, useDeleteTaskMutation, useMarkCompleteMutation } = TaskAPI;