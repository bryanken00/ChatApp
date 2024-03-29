import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Chat from "../components/PagesFunction/Chat";
import Login from "../components/Functions/login";
import contact from "../components/Functions/contacts";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef, useCallback } from "react";

const ChatApp = () => {
  let { id } = useParams();
  const [isClickable, setIsClickable] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const [getNickname, setNickname] = useState("Contact Name");
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for menu visibility

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
  }, [activeButton]); // Log activeButton whenever it changes

  const handleContactUser = useCallback(
    (user2) => {
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
      }, 1000);
    },
    [
      isClickable,
      username,
      contactReadData,
      loginReadData,
      createData,
      navigate,
    ]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (id !== undefined) {
          handleSendMessage();
        }
      }
    },
    [id, handleSendMessage]
  );

  const chatSystem = useCallback((id, chatReadData, username) => {
    if (id === undefined) {
      return (
        <div className="text-center text-gray-500">
          <p>Welcome to My Chat App</p>
        </div>
      );
    } else {
      const filteredChat = chatReadData.filter(
        (account) => account.chat_uid === id
      );
      return filteredChat.map((account) =>
        account.username !== username ? (
          <div key={account.id} className="flex flex-col mb-4 text-left">
            <span className="font-semibold">{account.username}</span>
            <p className="bg-gray-300 rounded-lg p-2 mt-1 self-start">
              {account.message}
            </p>
          </div>
        ) : (
          <div key={account.id} className="flex flex-col mb-4">
            <span className="font-semibold text-right">You</span>
            <p className="bg-blue-500 text-white rounded-lg p-2 mt-1 self-end">
              {account.message}
            </p>
          </div>
        )
      );
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [chatReadData, scrollToBottom]);

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
          {loginReadData.map((contact, index) =>
            contact.Username === username ? (
              ""
            ) : (
              <button
                key={index}
                onClick={() => handleContactUser(contact.Username)}
                className={`bg-blue-500 text-white px-4 py-2 rounded-full ${
                  activeButton === contact.Username ? "active" : ""
                }`}
              >
                {contact.nickname}
              </button>
            )
          )}
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
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-lg font-semibold bg-transparent rounded-lg py-2 px-4 flex items-center"
            >
              <span className="mr-4">Account Settings </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                <li>
                  <a
                    href={null}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href={null}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 py-2"
          ref={chatContainerRef}
        >
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
              onKeyDown={handleKeyDown}
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
