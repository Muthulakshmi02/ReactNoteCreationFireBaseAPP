import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "noteSlice",
    initialState: {
        noteList: [],
    },
    reducers: {
        setNoteList: (currentSlice, action) => {
            currentSlice.noteList = action.payload;
        },
        addNoteList: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload);
        },
        updateNoteList: (currentSlice, action) => {
            const indexUpdate = currentSlice.noteList.findIndex((note) => note.id === action.payload.id)
            currentSlice.noteList[indexUpdate] = action.payload;
        },
        deleteNoteList: (currentSlice, action) => {
            const filterRemainId = currentSlice.noteList.filter((note) => note.id !== action.payload.id)
            currentSlice.noteList = filterRemainId;
        }
    }
})

export const { setNoteList, addNoteList, updateNoteList, deleteNoteList } = noteSlice.actions;
export const notesReducer = noteSlice.reducer;


