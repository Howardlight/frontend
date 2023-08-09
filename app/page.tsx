"use client";

import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { useGetTasksQuery } from "../redux/services/taskApi";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import CreateModal from "@/components/modals/CreateModal";

export default function Home() {
  let [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isLoading, isFetching, data, error } = useGetTasksQuery(null);


  //TODO: Convert this to a grid
  //TODO: Add a loading spinner
  // console.log(tasks);
  if (isLoading || isFetching) return <Loading />;
  if (error) return <p>An error occured</p>;
  return (
    <main className="m-5 h-full">

      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <button onClick={() => setIsCreateModalOpen(true)} className="transition p-1 rounded-sm bg-gray-200 hover:bg-gray-300 shadow-sm">Create</button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        <Tasks tasksData={data!} />
      </div>

      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main>
  )
}

function Loading() {
  return (
    <div className="h-screen w-auto flex justify-center items-center">
      <IconLoader2 className="animate-spin w-48 h-48" />
    </div>
  )
}


function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
