import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebaseMessage from "../components/Functions/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const ChatApp = () => {
  const storedUserDataString = localStorage.getItem("userData");
  const storedUserData = JSON.parse(storedUserDataString);
  const username = storedUserData.Username;
  const [message, setMessage] = useState("");
  const { _data, readData, createData } = firebaseMessage();

  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [contactListWidth, setContactListWidth] = useState("20rem");
  const [isOpen, setDrawer] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleSendMessage = () => {
    createData(username, message);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Side - Contact List */}
      <div
        className="bg-gray-800 text-white p-4 flex flex-col"
        style={{
          width: "20rem",
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-semibold">Contact Name</span>
          </div>
        </div>
        <ul className="flex flex-col space-y-2">
          {/* Replace the content below with your contact list */}
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Friend 3</li>
          {/* End of contact list */}
        </ul>
      </div>
      {/* Right Side - Chat Window */}
      <div className="flex flex-col w-full">
        <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
          <div>
            <button
              className="text-white px-2 py-1 rounded-full bg-gray-700"
              onClick={() => setDrawer(!isOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <span className="text-lg font-semibold">Contact Name</span>
          </div>
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {_data.map((account) =>
            account.username !== username ? (
              <div key={account.id} className="flex flex-col mb-4 text-left">
                <span className="font-semibold">{account.username}:</span>
                <p className="bg-gray-300 rounded-lg p-2 mt-1 self-start">
                  {account.message}
                </p>
              </div>
            ) : (
              <div key={account.id} className="flex flex-col mb-4">
                <span className="font-semibold text-right">You:</span>
                <p className="bg-blue-500 text-white rounded-lg p-2 mt-1 self-end">
                  {account.message}
                </p>
              </div>
            )
          )}
        </div>
        <div className="p-4 bg-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-500 rounded-full px-4 py-2 mr-2 bg-gray-800 text-white"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
