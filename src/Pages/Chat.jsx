import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const navigate = useNavigate();

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (!storedUserDataString) navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
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
          <div className="flex flex-col mb-4">
            <span className="font-semibold">Contact:</span>
            <p className="bg-gray-300 rounded-lg p-2 mt-1">Hello!</p>
          </div>
          <div className="flex flex-col mb-4 self-end">
            <span className="font-semibold">You:</span>
            <p className="bg-blue-500 text-white rounded-lg p-2 mt-1">Hi!</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-500 rounded-full px-4 py-2 mr-2 bg-gray-800 text-white"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
