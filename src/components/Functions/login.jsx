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

const tableName = "users";

const firebaseCRUD = () => {
  const [loginReadData, _setData] = useState([]);
  const userCollectionRef = collection(db, tableName);

  const createData = async (username, password, nick) => {
    await addDoc(userCollectionRef, {
      Username: username,
      Password: password,
      nickname: nick,
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

  return { createData, loginReadData, updateData, deleteData };
};

export default firebaseCRUD;
