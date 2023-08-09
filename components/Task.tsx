"use client";
import { Task } from "@/types/Task";
import { Fragment, useState } from "react";
import { EditModal } from "./modals/EditModal";

export default function TaskCard({ task }: { task: Task }) {
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function openModal() {
        setIsEditModalOpen(true);
    }
    function closeModal() {
        setIsEditModalOpen(false);
    }


    return (
        <Fragment>
            <div className="w-80 bg-gray-100 shadow-sm p-3 rounded-md">
                <div className="flex flex-row justify-between mb-5">
                    <p className="font-semibold">{task.title}</p>
                    <button onClick={openModal}>Edit</button>
                </div>
                <p>{task.description}</p>
            </div>
            <EditModal isOpen={isEditModalOpen} closeModal={closeModal} task={task} />
        </Fragment>
    )
}