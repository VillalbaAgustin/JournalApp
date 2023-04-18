import { async } from '@firebase/util';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNote, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('El uid de usuario no existe');
    const resp = await loadNotes(uid);

    dispatch(setNote(resp));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const noteToFireStore = { ...activeNote };
    delete noteToFireStore.id;


    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = ( files = [] ) => {
  return async (dispatch) => {
    dispatch(setSaving);
    // const resp = await fileUpload(files[0]);
    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload( file ))
    }

    const photoUrls = await Promise.all( fileUploadPromises );
    dispatch( setPhotosToActiveNote( photoUrls ));
  }
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving);

    const {uid} = getState().auth;
    const {active: activeNote} = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    const resp = await deleteDoc(docRef);   //borra de Firebase
    dispatch(deleteNoteById(activeNote.id))

  }
}