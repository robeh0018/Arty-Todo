import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAt9WuY5mcjbs2fL5BQ8akefTkhXuKzi80",
  authDomain: "todo-app-02-47c6c.firebaseapp.com",
  projectId: "todo-app-02-47c6c",
  storageBucket: "todo-app-02-47c6c.appspot.com",
  messagingSenderId: "446979013127",
  appId: "1:446979013127:web:58393f0afa02035470c8a2",
  measurementId: "G-HLWMB2E8T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseDb = getFirestore(app);
export const FirebaseAuth = getAuth(app);
