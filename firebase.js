// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnmLgp5NHlvoe6HoHRj7pGoPS3V2Keb6k",
  authDomain: "flashcards-saas-cba16.firebaseapp.com",
  projectId: "flashcards-saas-cba16",
  storageBucket: "flashcards-saas-cba16.appspot.com",
  messagingSenderId: "213650339905",
  appId: "1:213650339905:web:f8048c0bed0959abdd6ec0",
  measurementId: "G-RQVTY6TK1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}