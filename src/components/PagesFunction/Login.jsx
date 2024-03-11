import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebaseCRUD from "../Functions/Crud";

const Login_localStorage = () => {
  const navigate = useNavigate();
  const storedUserDataString = localStorage.getItem("userData");
  const storedRememberMe = localStorage.getItem("remember.user");
  const storedRememberMeUsername = JSON.parse(
    localStorage.getItem("remember.username")
  );

  // Account Data
  const { _data } = firebaseCRUD();

  // Error Message
  const [errorMessage, setErrorMessage] = useState("");

  //Remember
  const [rememberMe, setRememberMe] = useState(
    storedRememberMe === "true" ? true : false
  );

  //Username
  const [userName, setUserName] = useState(
    storedRememberMe === "true" ? storedRememberMeUsername : ""
  );

  //Password
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (storedUserDataString) navigate("/chat");
  });

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("remember.user", JSON.stringify(true));
      localStorage.setItem("remember.username", JSON.stringify(userName));
    } else {
      localStorage.removeItem("remember.user");
      localStorage.removeItem("remember.username");
    }
  }, [handleRememberMe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = _data.find(
      (data) => data.Username === userName && data.Password === password
    );

    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/chat");
    } else {
      setErrorMessage("Incorrect username or password. Please try again.");
    }
    if (storedRememberMe !== null) setRememberMe(true);
  };

  return {
    rememberMe,
    handleRememberMe,
    userName,
    setUserName,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
  };
};

export default Login_localStorage;
