// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7osMP98yoGk3J-qFFy77Y7g_hAEtFyv8",
  authDomain: "app-tarea-776c8.firebaseapp.com",
  projectId: "app-tarea-776c8",
  storageBucket: "app-tarea-776c8.appspot.com",
  messagingSenderId: "442625323060",
  appId: "1:442625323060:web:c497163960b08565331a61",
  measurementId: "G-VJGF60HVCW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, firebaseConfig as default };
