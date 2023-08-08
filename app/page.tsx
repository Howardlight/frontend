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
    <main>
      <div className="flex flex-row gap-2 justify-center flex-wrap">
        <Tasks tasksData={data!} />
      </div>
    </main>
  )
}

function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
