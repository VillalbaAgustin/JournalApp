// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVzNUPhSpgu3gS6IhVtRnUeQ3IezCNj8",
  authDomain: "react-curso-5e376.firebaseapp.com",
  projectId: "react-curso-5e376",
  storageBucket: "react-curso-5e376.appspot.com",
  messagingSenderId: "388000691728",
  appId: "1:388000691728:web:f295913ddb172dca06fc95"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
