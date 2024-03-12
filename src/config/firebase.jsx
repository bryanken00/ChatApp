import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWymQwOn5slCutArNrvNzWJW0SA_UpISY",
  authDomain: "mychatapp-df24d.firebaseapp.com",
  projectId: "mychatapp-df24d",
  storageBucket: "mychatapp-df24d.appspot.com",
  messagingSenderId: "359304437452",
  appId: "1:359304437452:web:67174e8eab716d5a4d2c69",
  measurementId: "G-1ECJHL81GK",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
