import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNote } from "./journalSlice";



export const startNewNote = () =>{
  return async(dispatch, getState) => {

    dispatch(savingNewNote());

    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ));
    const setDocResp = await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;
    // console.log({newDoc,setDocResp});
    dispatch( addNewEmptyNote(newNote) )
    dispatch( setActiveNote(newNote) )

  }
}


export const startLoadingNote = () => {
  return async(dispatch, getState) => {

    const {uid} = getState().auth;
    console.log({uid});

    if(!uid) throw new Error('El uid de usuario no existe');
    const resp = await loadNotes(uid);

    dispatch(setNote(resp));
  }
}