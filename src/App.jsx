import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import ChatLayout from "./components/Layouts/ChatLayout";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import ChatApp from "./Pages/Chat";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<ChatApp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
