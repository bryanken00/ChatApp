import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebaseMessage from "../components/Functions/message";

const ChatApp = () => {
  const storedUserDataString = localStorage.getItem("userData");
  const storedUserData = JSON.parse(storedUserDataString);
  const username = storedUserData.Username;
  const [message, setMessage] = useState("");
  const { _data, readData, createData } = firebaseMessage();

  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [timer, setTimer] = useState(0);

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
      <div className="flex flex-col w-full">
        <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Contact Name</span>
          <span className="text-lg font-semibold" onClick={handleLogout}>
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
