"use client";
import { Task } from "@/types/Task";
import { Fragment, useState } from "react";
import { EditModal } from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMarkCompleteMutation } from "@/redux/services/taskApi";

export default function TaskCard({ task }: { task: Task }) {
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [setComplete, { isLoading }] = useMarkCompleteMutation();

    function openModal() {
        setIsEditModalOpen(true);
    }
    function closeModal() {
        setIsEditModalOpen(false);
    }


    return (
        <Fragment>
            <div className="flex flex-col justify-between w-80 bg-gray-100 shadow-sm p-3 rounded-md">
                <div>

                    <div className="flex flex-row justify-between mb-5">
                        <p className="font-semibold">{task.title}</p>

                        <button onClick={openModal}><IconEdit /></button>
                    </div>
                    <p>{task.description}</p>

                </div>

                <div className="flex flex-row justify-between pt-4 gap-2">
                    <input checked={task.completed} onChange={() => setComplete({ complete: !task.completed, id: task._id })} className="transition w-6 rounded-sm" type="checkbox"></input>
                    <button onClick={() => setIsDeleteModalOpen(true)}><IconTrash /></button>
                </div>
            </div>
            <EditModal isOpen={isEditModalOpen} closeModal={closeModal} task={task} />
            <DeleteModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} task={task} />
        </Fragment>
    )
}