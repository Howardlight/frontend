import { Transition, Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment } from "react";
import { useDeleteTaskMutation } from "@/app/redux/services/taskApi";
import { Task } from "@/types/Task";

export default function DeleteModal({ task, isOpen, setIsOpen }: { task: Task, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const [deleteTask, { isLoading }] = useDeleteTaskMutation();

    function closeModal() {
        setIsOpen(false);
    }

    //TODO: Add loading state
    async function handleDelete() {
        await deleteTask(task._id);
        closeModal();
    }

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
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Are you sure you want to delete this Task?</Dialog.Title>
                                <Dialog.Description>You cannot revert this decision.</Dialog.Description>


                                <div className="flex flex-row justify-end gap-1 mt-4">
                                    <button className="p-2" onClick={handleDelete}>Delete</button>
                                    <button className="p-2" onClick={closeModal}>Cancel</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}