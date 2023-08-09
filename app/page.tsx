"use client";

import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useGetTasksQuery } from "./redux/services/taskApi";

export default function Home() {
  const tasks = useAppSelector((state) => state.taskReducer);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetTasksQuery(null);

  //TODO: Convert this to a grid
  //TODO: Add a loading spinner
  // console.log(tasks);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>An error occured</p>;
  return (
    <main className="m-5 h-full">
      <div className="flex flex-row justify-between p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <button>Create</button>
      </div>
      {/* <div className="flex flex-row gap-2 justify-center flex-wrap"> */}
      <div className="grid grid-flow-row grid-cols-3 gap-4">
        <Tasks tasksData={data!} />
      </div>
    </main>
  )
}

function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
