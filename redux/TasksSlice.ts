import { Task } from "@/types/Task";
import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
    state: 'loading' | 'finished';
    data: Task[]
}

const initialState: SliceState = { state: 'loading', data: [] }

const TaskSlice = createSlice({
    name: "Tasks",
    initialState: initialState,
    reducers: {
        setTo: (state, action) => { state = { state: 'finished', data: action.payload }; }
    }
})

const { actions, reducer } = TaskSlice;

export const { setTo } = actions;
export default reducer;