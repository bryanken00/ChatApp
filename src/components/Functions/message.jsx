import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const tableName = "conversations";

const firebaseMessage = () => {
  const [chatReadData, _setData] = useState([]);
  const userCollectionRef = collection(db, tableName);
  const currentDate = Timestamp.now();

  const createData = async (username, message, uid) => {
    await addDoc(userCollectionRef, {
      username: username,
      message: message,
      date: currentDate,
      chat_uid: uid,
    });
    readData();
  };

  const readData = async () => {
    const q = query(userCollectionRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);
    _setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    readData();
  }, []);

  const updateData = async (id, Password) => {
    const userDoc = doc(db, tableName, id);
    const newPassword = { Password: Password };
    await updateDoc(userDoc, newPassword);
    readData();
  };

  const deleteData = async (id) => {
    const userDoc = doc(db, tableName, id);
    await deleteDoc(userDoc);
    readData();
  };

  return { createData, chatReadData, updateData, deleteData, readData };
};

export default firebaseMessage;
