import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: []},
  reducers: {
    addTask: (state, actions) =>{
        state.tasks = [...state.tasks, actions.payload];
    },
    getTasks: (state, actions) =>{
        state.tasks = [...actions.payload];
    },
    deleteTask: (state, actions) =>{
        state.tasks = state.tasks.filter((task) => task._id !== actions.payload);
    },
    resetTask: (state, actions) =>{
        state.tasks = [];
    },
  },
});

export const taskActions = TaskSlice.actions;
export default TaskSlice;
