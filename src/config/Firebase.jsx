// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg9tyd8MHr5CLAgWbB08EGLb9idB6zrg0",
  authDomain: "fir-course-8736d.firebaseapp.com",
  projectId: "fir-course-8736d",
  storageBucket: "fir-course-8736d.appspot.com",
  messagingSenderId: "673998758639",
  appId: "1:673998758639:web:3b201c3c73c2f464e5311a",
  measurementId: "G-76ZBNPFTE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleProvider= new GoogleAuthProvider();

export const db=getFirestore(app) ;
export const storage= getStorage(app);