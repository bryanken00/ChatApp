import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Chat from "../components/PagesFunction/Chat";
import Login from "../components/Functions/login";
import contact from "../components/Functions/contacts";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const ChatApp = () => {
  let { id } = useParams();
  const [isClickable, setIsClickable] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const [getNickname, setNickname] = useState("Contact Name");
  const navigate = useNavigate();

  const {
    handleLogout,
    handleSendMessage,
    chatReadData,
    username,
    message,
    setMessage,
    isOpen,
    setDrawer,
    setCUID,
  } = Chat();
  const { loginReadData } = Login();
  const { createData, contactReadData, updateData, deleteData } = contact();

  useEffect(() => {
    setCUID(id);
    console.log(activeButton);
  }, [activeButton]); // Log activeButton whenever it changes

  const handleContactUser = (user2) => {
    if (!isClickable) return;
    setIsClickable(false);
    setActiveButton(user2);
    const randomId = uuidv4();
    const existingContact = contactReadData.find(
      (user) =>
        (user.user1 === username && user.user2 === user2) ||
        (user.user2 === username && user.user1 === user2)
    );

    if (existingContact) {
      const newNickArray = loginReadData.filter(
        (user) => user.Username === user2
      );
      setNickname(newNickArray[0].nickname);

      // setNickname(newNick.nickname);
      navigate(`/chat/${existingContact.id}`);
    } else {
      createData(randomId, username, user2);
    }

    setTimeout(() => {
      setIsClickable(true);
    }, 3000);
  };

  const chatSystem = (id, chatReadData, username) => {
    const filteredChat = chatReadData.filter(
      (account) => account.chat_uid === id
    );
    if (id === undefined) return null;
    else {
      return filteredChat.map((account) =>
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
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div
        className="bg-gray-800 text-white p-4 flex flex-col"
        style={{
          width: "20rem",
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-semibold">Contact List</span>
          </div>
        </div>
        <ul className="flex flex-col space-y-2">
          {loginReadData.map((contact, index) => (
            <button
              key={index}
              onClick={() => handleContactUser(contact.Username)}
              className={`bg-blue-500 text-white px-4 py-2 rounded-full ${
                activeButton === contact.Username ? "active" : ""
              }`}
            >
              {contact.Username}
            </button>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
          <div>
            <button
              className="text-white px-2 py-1 rounded-full bg-gray-700"
              onClick={() => setDrawer(!isOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <span className="text-lg font-semibold">{getNickname}</span>
          </div>
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {chatSystem(id, chatReadData, username)}
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
              onClick={id === undefined ? null : handleSendMessage}
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
