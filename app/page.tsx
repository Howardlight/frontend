"use client";

import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { useGetTasksQuery } from "../redux/services/taskApi";
import CreateModal from "@/components/modals/CreateModal";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { PageController } from "./PageController";
import { Filter } from "@/types/Filter";
import { FilterMenu } from "../components/FilterMenu";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<Filter>({ completed: undefined, date: undefined })
  const { isLoading, isFetching, data, error } = useGetTasksQuery({ offset: page * 9, filter: filter });

  return (
    <main className="m-5 h-full">

      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <div className="flex flex-row items-center gap-2">
          <FilterMenu setFilter={setFilter} setPage={setPage} />
          <button onClick={() => setIsCreateModalOpen(true)} className="transition p-2 rounded-sm bg-gray-200 hover:bg-gray-300 shadow-sm">Create</button>
        </div>
      </div>

      <Tasks isFetching={isFetching} isLoading={isLoading} error={error} tasksData={data?.data!} />


      <PageController page={page} setPage={setPage} totalPages={data?.paging.pages} />
      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main >
  )
}

function Loading() {
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

function Tasks({ tasksData, isLoading, isFetching, error }: { tasksData: TaskType[], isLoading: boolean, isFetching: boolean, error: FetchBaseQueryError | SerializedError | undefined }) {

  if (isLoading || isFetching) return <Loading />;
  if (error) return <p>An error occured</p>;
  return (
    <div className="grid justify-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {tasksData.map(task => <TaskCard key={task._id} task={task} />)}
    </div>
  );
}
