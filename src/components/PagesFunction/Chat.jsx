import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import firebaseMessage from "../Functions/message";

const Chat = () => {
  const storedUserDataString = localStorage.getItem("userData");
  const storedUserData = JSON.parse(storedUserDataString);
  const username = storedUserData.Username;
  const [message, setMessage] = useState("");
  const { chatReadData, readData, createData } = firebaseMessage();

  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isOpen, setDrawer] = useState(false);
  const [getCUID, setCUID] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
    readData();
  }, [timer]);

  useEffect(() => {
    if (!storedUserDataString) navigate("/");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userData");
    navigate("/");
  }, [navigate]);

  const handleSendMessage = useCallback(() => {
    createData(username, message, getCUID);
    setMessage("");
  }, [createData, username, message, getCUID]);

  return {
    handleLogout,
    handleSendMessage,
    chatReadData,
    username,
    message,
    setMessage,
    isOpen,
    setDrawer,
    setCUID,
  };
};

export default Chat;
