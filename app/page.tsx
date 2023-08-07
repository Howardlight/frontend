import Image from 'next/image'

async function getTasks() {
  const res = await fetch(`http://localhost:5000/api/task`, { method: "GET" });

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
