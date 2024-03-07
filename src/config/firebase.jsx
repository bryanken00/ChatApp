import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUHn9dsloycGAv-Y204c_heYrvABN_2d0",
  authDomain: "fir-reactjs-9d726.firebaseapp.com",
  projectId: "fir-reactjs-9d726",
  storageBucket: "fir-reactjs-9d726.appspot.com",
  messagingSenderId: "872854308290",
  appId: "1:872854308290:web:0d963c2f87b0cd07fac25b",
  measurementId: "G-MY1JB55X68",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
