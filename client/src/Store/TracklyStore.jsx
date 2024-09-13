import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import BoardSlice from "./BoardSlice";
import TasklistSlice from "./TasklistSlice";
import TaskSlice from "./TaskSlice";

const TracklyStore = configureStore({
  reducer: {
    usersAuth: UserSlice.reducer,
    boards: BoardSlice.reducer,
    tasklists: TasklistSlice.reducer,
    tasks: TaskSlice.reducer,
  },
});

export default TracklyStore;