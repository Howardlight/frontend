import { useUpdateTaskMutation } from "@/app/redux/services/taskApi";
import { Task } from "@/types/Task";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskValidationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title cannot be shorter than 3 characters").required("Title is required"),
    description: Yup.string().min(10, "Description cannot be shorter than 10 characters").required("Description is required"),
    dueDate: Yup.date()
})


export default function EditForm({ task, closeModal }: { task: Task, closeModal: () => void }) {
    const [updateTask, { isLoading }] = useUpdateTaskMutation();

    return (
        <Formik
            initialValues={task}
            validationSchema={TaskValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));

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
    )
}