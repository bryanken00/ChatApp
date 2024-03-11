import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwc9GPCjqDW9JY4cwcsGOgQuv04ygL3sI",
  authDomain: "chatapp-707db.firebaseapp.com",
  projectId: "chatapp-707db",
  storageBucket: "chatapp-707db.appspot.com",
  messagingSenderId: "423519343868",
  appId: "1:423519343868:web:91b4afed569427fd94b379",
  measurementId: "G-WSHBR03921",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
