import { async } from '@firebase/util';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import {addNewEmptyNote,setActiveNote,savingNewNote,setNote, setSaving, updateNote} from './journalSlice';

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
    // console.log({newDoc,setDocResp});
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    // console.log({uid});

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

    const noteToFireStore = {...activeNote};
    delete noteToFireStore.id;

    // console.log(noteToFireStore);

    const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ activeNote.id}`);
    await setDoc( docRef, noteToFireStore, {merge: true});

    dispatch(updateNote(activeNote))
  }
}
