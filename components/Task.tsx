"use client";
import { Task } from "@/types/Task";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EditForm from "./EditForm";

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

function EditModal({ task, isOpen, closeModal }: { task: Task, isOpen: boolean, closeModal: () => void }) {

    //TODO: Style Buttons, disabled, loading ect...

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className={"relative z-10"} open={isOpen} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="min-w-[500px] max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Modify {task.title}</Dialog.Title>

                                <EditForm closeModal={closeModal} task={task} />

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}