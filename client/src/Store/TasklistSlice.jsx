import { createSlice } from "@reduxjs/toolkit";

const TasklistSlice = createSlice({
  name: "tasklists",
  initialState: { tasksList: [] },
  reducers: {
    addTasklist: (state, actions) => {
      state.tasksList = [...state.tasksList, actions.payload];
    },
    getTaskslist: (state, actions) => {
      state.tasksList = [...actions.payload];
    },
    deleteTasklist: (state, actions) => {
      state.tasksList = state.tasksList.filter(
        (taskList) => taskList._id !== actions.payload
      );
    },
    resetTasklist: (state, actions) => {
      state.tasksList = [];
    },
  },
});

export const tasklistActions = TasklistSlice.actions;
export default TasklistSlice;
