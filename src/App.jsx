import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import ChatLayout from "./components/Layouts/ChatLayout";
import LoginPage from "./Pages/Login";
import ChatApp from "./Pages/Chat";
import RegisterPage from "./Pages/Register";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<ChatApp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
