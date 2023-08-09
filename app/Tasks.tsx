"use client";
import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function Tasks({ tasksData, isLoading, isFetching, error }: { tasksData: TaskType[]; isLoading: boolean; isFetching: boolean; error: FetchBaseQueryError | SerializedError | undefined; }) {

    if (isLoading || isFetching) return <TaskLoadings />;
    if (error) return <p>An error occured</p>;
    return (
        <div className="grid justify-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {tasksData.map(task => <TaskCard key={task._id} task={task} />)}
        </div>
    );
}

export function TaskLoadings() {
    return (
        <div className="grid justify-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {Array(9).fill(true).map((item, index) => <TaskLoading key={index} />)}
        </div>
    )
}

function TaskLoading() {
    return (
        <div className="w-80 h-36 bg-gray-100 rounded-md flex flex-col justify-between shadow-sm p-3">
            <div className="flex flex-col gap-1 mb-5">
                <div className="flex flex-row justify-between">
                    <div className="animate-pulse h-6 w-24 bg-gray-200 rounded-sm" />
                    <div className="animate-pulse h-6 w-6 rounded-sm bg-gray-200" />
                </div>

                <div className="animate-pulse h-4 w-28 bg-gray-200 rounded-sm" />
            </div>


            <div className="flex flex-row justify-between">
                <div className="animate-pulse w-6 h-6 bg-gray-200" />
                <div className="animate-pulse w-6 h-6 bg-gray-200" />
            </div>
        </div >
    )
}
