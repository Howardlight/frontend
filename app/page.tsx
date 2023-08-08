import TaskCard from "@/components/Task";
import { Task as TaskType } from "@/types/Task";

async function getTasks() {
  //TODO: Replace this with local.env
  const res = await fetch(`${process.env.BACKEND_URL}/api/task`, { method: "GET", cache: "no-cache" });

  //Triggers closest error.js 
  //TODO: Create an Error.js for when Tasks could not be loaded
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks!`);
  }


  return res.json();
}

export default async function Home() {
  const data = await getTasks();

  //TODO: Convert this to a grid

  console.log(data);
  return (
    <main>
      <div className="flex flex-row gap-2 justify-center flex-wrap">
        <Tasks tasksData={data} />
      </div>
    </main>
  )
}

function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
