import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./notes/notes";
export const store = configureStore({
  reducer: {
    noteSlice: notesReducer,
  },
});


