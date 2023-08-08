"use client";
import { Task } from "@/types/Task";
import { Dialog, Transition } from "@headlessui/react";
import { ErrorMessage, Formik } from "formik";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateTaskMutation } from "@/app/redux/services/taskApi";

const TaskValidationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title cannot be shorter than 3 characters").required("Title is required"),
    description: Yup.string().min(10, "Description cannot be shorter than 10 characters").required("Description is required"),
    dueDate: Yup.date()
})


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
            <div className="w-80 bg-gray-200 shadow-sm p-3 rounded-md">
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
    const [updateTask, { isLoading }] = useUpdateTaskMutation();
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


                                <Formik
                                    initialValues={task}
                                    validationSchema={TaskValidationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));

                                            const task: Task = {
                                                __v: values.__v,
                                                _id: values._id,
                                                completed: values.completed,
                                                description: values.description,
                                                dueDate: values.dueDate,
                                                title: values.title
                                            };

                                            updateTask(task);
                                            setSubmitting(false);
                                            closeModal();
                                        }, 400);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        setFieldValue,
                                        isValid
                                    }) => (
                                        <form className="flex flex-col min-h-[350px] justify-between" onSubmit={handleSubmit}>
                                            <div className="flex flex-col">

                                                <div className="flex flex-col mt-4">
                                                    <p className="font-medium">Title</p>
                                                    <input className="p-1 bg-gray-100 mt-2 rounded-sm" type="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                                                    <ErrorMessage name="title" />
                                                </div>

                                                <div className="flex flex-col mt-4">
                                                    <p className="font-medium">Description</p>
                                                    <textarea className=" p-1 caret-black bg-gray-100 mt-2 max-h-36 min-h-[4rem] rounded-sm" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                                                    {errors.description && touched.description && errors.description}
                                                </div>

                                                <div className="flex flex-col mt-8">
                                                    <p className="font-medium">Due Date</p>
                                                    <DatePicker
                                                        selected={new Date(values.dueDate)}
                                                        dateFormat="MMMM d, yyyy"
                                                        className="bg-gray-100 p-1 w-full mt-2"
                                                        name="dueDate"
                                                        onChange={date => setFieldValue('dueDate', date)}
                                                    />
                                                    <ErrorMessage name="dueDate" />
                                                </div>

                                            </div>

                                            <div className="flex flex-row justify-end gap-1 mt-4">
                                                <button disabled={!isValid} className="p-2">Update</button>
                                                <button className="p-2" onClick={closeModal}>Cancel</button>
                                            </div>
                                        </form>
                                    )}

                                </Formik>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}