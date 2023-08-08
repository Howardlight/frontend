"use client";
import { Task } from "@/types/Task";

export default function TaskCard({ task }: { task: Task }) {



    return (
        <div className="w-80 bg-gray-500 p-3 rounded-md">
            <div className="flex flex-row justify-between mb-5">
                <p className="font-semibold">{task.title}</p>
                <button>Edit</button>
            </div>
            <p>{task.description}</p>
        </div>
    )
}

function getDay(inDate: Date) {
    try {
        const date = new Date(inDate);
        return date.toDateString();

    } catch (error) {
        return "Unknown Date";
    }
}