"use client";

import TaskCard from "@/components/Task";
import { CreateTask, Task, Task as TaskType } from "@/types/Task";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useCreateTaskMutation, useGetTasksQuery } from "./redux/services/taskApi";
import EditForm, { TaskValidationSchema } from "@/components/EditForm";
import { Transition, Dialog } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  let [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


  const { isLoading, isFetching, data, error } = useGetTasksQuery(null);


  //TODO: Convert this to a grid
  //TODO: Add a loading spinner
  // console.log(tasks);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>An error occured</p>;
  return (
    <main className="m-5 h-full">
      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <button onClick={() => setIsCreateModalOpen(true)} className="transition p-1 rounded-sm bg-gray-200 outline-1 outline-gray-400 outline-double hover:bg-gray-300 shadow-sm">Create</button>
      </div>
      {/* <div className="flex flex-row gap-2 justify-center flex-wrap"> */}
      <div className="grid grid-cols-5 gap-5">
        <Tasks tasksData={data!} />
      </div>
      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main>
  )
}

function CreateModal({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Create a New Task</Dialog.Title>

                <CreateForm closeModal={closeModal} />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function CreateForm({ closeModal }: { closeModal: () => void }) {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const initialValue: CreateTask = {
    completed: false,
    description: "",
    dueDate: new Date(Date.now()),
    title: "New Task"
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={TaskValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));

          const task: CreateTask = {
            completed: values.completed,
            description: values.description,
            dueDate: values.dueDate,
            title: values.title
          };

          createTask(task);
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
                selected={values.dueDate}
                dateFormat="MMMM d, yyyy"
                className="bg-gray-100 p-1 w-full mt-2"
                name="dueDate"
                onChange={date => setFieldValue('dueDate', date)}
              />
              <ErrorMessage name="dueDate" />
            </div>

          </div>

          <div className="flex flex-row justify-end gap-1 mt-4">
            <button disabled={!isValid} className="p-2">Create</button>
            <button className="p-2" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      )}

    </Formik>
  )
}


function Tasks({ tasksData }: { tasksData: TaskType[] }) {
  return tasksData.map(task => <TaskCard key={task._id} task={task} />)
}
