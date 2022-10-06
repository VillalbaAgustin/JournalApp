import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      /* active: {
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
        state.messageSaved = '';
      },
      setNote: (state, action) => {
        state.notes = action.payload;
        state.isSaving = false;
      },
      setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
      },
      updateNote: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map( (nota) => {
          if (nota.id === action.payload.id) {
            // nota = action.payload; MALLL
            return action.payload;
          }
          return nota;
        });
        state.messageSaved = `${action.payload.title}, actualizada correctamente`;
      },
      setPhotosToActiveNote: (state, action) => {
        state.isSaving = false;
        state.active.imageUrls = [ ...state.active.imageUrls , ...action.payload];
      },
      clearNotesLogout: (state, action) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
      },
      deleteNoteById: (state, action) => {
        state.active = null;
        state.isSaving = false;
        state.notes = state.notes.filter((note) => note.id !== action.payload );

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
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;