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

  console.log(data);
  return (
    <main>

    </main>
  )
}
