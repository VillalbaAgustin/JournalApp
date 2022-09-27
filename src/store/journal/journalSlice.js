import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      /* activeNote: {
        id: 'ABCDE',
        title: '',
        body: '',
        date: 123456,
        imageUrls: [], //http://photo1.jpg, http://photo2.jpg, ...
      } */
    },
    reducers: {
      savingNewNote: (state, action) =>{
        state.isSaving = true;
      },
      addNewEmptyNote: (state, action) =>{
        state.notes.push( action.payload);
        state.isSaving = false;
      },
      setActiveNote: (state, action) => {
        state.active = action.payload;
      },
      setNote: (state, action) => {

      },
      setSaving: (state) => {

      },
      updateNote: (state, action) => {

      },
      deleteNodeById: (state, action) => {

      },
      }
    });


   // Action creators are generated for each case reducer function
export const { 
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
  deleteNodeById,
} = journalSlice.actions;