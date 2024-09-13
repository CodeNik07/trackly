import { createSlice } from "@reduxjs/toolkit";

const BoardSlice = createSlice({
  name: "boards",
  initialState: { boardList: [] },
  reducers: {
    addBoard: (state, action) => {
      state.boardList = [...state.boardList, action.payload];
    },
    getBoards: (state, action) => {
      state.boardList = [...action.payload];
    },
    deleteBoard: (state, action) => {
      state.boardList = state.boardList.filter(
        (board) => board._id !== action.payload
      );
    },
    resetBoard: (state, action) => {
      state.boardList = [];
    },
  },
});

export const boardActions = BoardSlice.actions;
export default BoardSlice;
