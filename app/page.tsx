"use client";

import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { useGetTasksQuery } from "./redux/services/taskApi";
import { useState } from "react";
import CreateModal from "@/components/modals/CreateModal";

export default function Home() {
  let [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


  const { isLoading, isFetching, data, error } = useGetTasksQuery(null);


  //TODO: Convert this to a grid
  //TODO: Add a loading spinner
  // console.log(tasks);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>An error occured</p>;
  return (
    <main className="m-5 h-full">
      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <button onClick={() => setIsCreateModalOpen(true)} className="transition p-1 rounded-sm bg-gray-200 outline-1 outline-gray-400 outline-double hover:bg-gray-300 shadow-sm">Create</button>
      </div>
      {/* <div className="flex flex-row gap-2 justify-center flex-wrap"> */}
      <div className="grid grid-cols-5 gap-5">
        <Tasks tasksData={data!} />
      </div>
      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main>
  )
}


function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
