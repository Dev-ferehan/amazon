// Import the functions you need from the SDKs you need
import  firebase  from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZZjmU9sXEmjflxnsiEsN-RAYRC8mbe9E",
  authDomain: "clone-7a3a0.firebaseapp.com",
  projectId: "clone-7a3a0",
  storageBucket: "clone-7a3a0.firebasestorage.app",
  messagingSenderId: "469517775749",
  appId: "1:469517775749:web:712e48056bddf8756e0aec"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth= getAuth(app)
export const db = app.firestore()