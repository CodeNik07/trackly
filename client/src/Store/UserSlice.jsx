import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    userLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    userProfile: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice;
