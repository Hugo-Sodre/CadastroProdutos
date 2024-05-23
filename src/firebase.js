// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZw32PY28Er_uNcfHO4PYa9mxdaVdSLwE",
  authDomain: "cadastroprod-e59e7.firebaseapp.com",
  projectId: "cadastroprod-e59e7",
  storageBucket: "cadastroprod-e59e7.appspot.com",
  messagingSenderId: "180691163686",
  appId: "1:180691163686:web:3e5bbf9e5b30971cfba4e7",
  measurementId: "G-PC56098KZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };