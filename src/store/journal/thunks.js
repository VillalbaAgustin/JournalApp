import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote } from "./journalSlice";



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
    console.log({newDoc,setDocResp});
    //dispatch
    dispatch( addNewEmptyNote(newNote) )
    dispatch( setActiveNote(newNote) )

  }
}