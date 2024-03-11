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
  const [_data, _setData] = useState([]);
  const userCollectionRef = collection(db, tableName);

  const createData = async (username, password) => {
    await addDoc(userCollectionRef, {
      Username: username,
      Password: password,
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

  return { createData, _data, updateData, deleteData };
};

export default Contacts;
