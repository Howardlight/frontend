"use client";

import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { useGetTasksQuery } from "../redux/services/taskApi";
import { IconLoader2 } from "@tabler/icons-react";
import CreateModal from "@/components/modals/CreateModal";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useState, Fragment } from "react";
import { PageController } from "./PageController";

export default function Home() {
  let [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { isLoading, isFetching, data, error } = useGetTasksQuery(page * 9);

  //TODO: Convert this to a grid
  //TODO: Add a loading spinner
  return (
    <main className="m-5 h-full">

      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <button onClick={() => setIsCreateModalOpen(true)} className="transition p-1 rounded-sm bg-gray-200 hover:bg-gray-300 shadow-sm">Create</button>
      </div>

      <Tasks isFetching={isFetching} isLoading={isLoading} error={error} tasksData={data?.data!} />


      <PageController page={page} setPage={setPage} totalPages={data?.paging.pages} />
      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main >
  )
}


function Loading() {
  return (
    <div className="h-[508px] w-auto flex justify-center items-center">
      <IconLoader2 className="animate-spin w-48 h-48" />
    </div>
  )
}

function Tasks({ tasksData, isLoading, isFetching, error }: { tasksData: TaskType[], isLoading: boolean, isFetching: boolean, error: FetchBaseQueryError | SerializedError | undefined }) {

  if (isLoading || isFetching) return <Loading />;
  if (error) return <p>An error occured</p>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {tasksData.map(task => <TaskCard key={task._id} task={task} />)}
    </div>
  );
}
