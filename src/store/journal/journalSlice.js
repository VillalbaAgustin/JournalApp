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
        state.notes = action.payload;
        state.isSaving = false;
      },
      setSaving: (state) => {
        state.isSaving = true;
        //TODO: Mensaje de error...
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