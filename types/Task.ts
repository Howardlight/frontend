export type Task = {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    __v: number;
}

export interface CreateTask {
    title: string;
    description: string;
    dueDate: Date | undefined;
    completed: boolean;
}