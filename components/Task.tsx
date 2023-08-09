"use client";
import { Task } from "@/types/Task";
import { Fragment, useState } from "react";
import { EditModal } from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function TaskCard({ task }: { task: Task }) {
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

                <div className="flex flex-row justify-end pt-4">
                    <button onClick={() => setIsDeleteModalOpen(true)}><IconTrash /></button>
                </div>
            </div>
            <EditModal isOpen={isEditModalOpen} closeModal={closeModal} task={task} />
            <DeleteModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} task={task} />
        </Fragment>
    )
}