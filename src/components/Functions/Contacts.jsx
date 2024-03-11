import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const tableName = "contacts";

const Contacts = () => {
  const [contactReadData, _setData] = useState([]);
  const userCollectionRef = collection(db, tableName);

  const createData = async (uid, user1, user2) => {
    await addDoc(userCollectionRef, {
      id: uid,
      user1: user1,
      user2: user2,
    });
    readData();
  };

  const readData = async () => {
    const data = await getDocs(userCollectionRef);
    _setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  return { createData, contactReadData, updateData, deleteData };
};

export default Contacts;
