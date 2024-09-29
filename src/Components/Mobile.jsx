import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import test from "../assets/test.png";
import { ContextApp } from "../utils/Context";

function Mobile() {
  const {
    Mobile,
    setMobile,
    handleConversationClick,
    handlePersonalizedChatClick,
  } = useContext(ContextApp);
  const [conversations, setConversations] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/conversations`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations", error);
      }
    };
    fetchConversations();
  }, [token, userId]);

  const handleNewChat = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/conversations/new`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations([...conversations, response.data]);
    } catch (error) {
      console.error("Error creating new conversation", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/conversations/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations(
        conversations.filter((convo) => convo.conversationId !== conversationId)
      );
    } catch (error) {
      console.error("Error deleting conversation", error);
    }
  };

  return (
    <div className="absolute left-0 top-0 w-full z-50 bg-black/40 flex justify-between items-start">
      <div
        className={
          Mobile
            ? "h-screen bg-leftNav w-[300px] flex items-center justify-between p-2 text-white flex-col translate-x-0"
            : "hidden"
        }
      >
        <div className="flex flex-col items-center justify-between gap-2 w-full">
          <div className="flex items-center w-full gap-2">
            <span
              className="border border-gray-600 bg-gray-600 rounded-xl w-full py-2 text-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
              onClick={handleNewChat}
            >
              <AiOutlinePlus fontSize={25} />
              New Chat
            </span>
          </div>
        </div>

        {/* Middle section - Conversations */}
        <div className="h-[80%] w-full p-2 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <span
                key={conversation.conversationId}
                className="rounded-lg w-full bg-gray-600 py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap"
                onClick={() => handleConversationClick(conversation)}
              >
                <span className="flex gap-2 items-center justify-center text-base">
                  <FiMessageSquare />
                  <span className="text-md">
                    {conversation.chats[0]?.message || "No chats yet"}
                  </span>
                </span>
                <RiDeleteBinLine
                  className="text-white"
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click on parent span
                    deleteConversation(conversation.conversationId);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-400">No conversations yet</span>
          )}
        </div>

        {/* Bottom section */}
        <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2">
          <span
            className="rounded-xl bg-gray-600 w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300"
            onClick={() => handlePersonalizedChatClick(userId)}
          >
            <span className="flex gap-2 items-center justify-center text-lg">
              <BsChatDots />
            </span>
            <span className="text-lg">Personalized Chat</span>
            <span className="rounded-md bg-yellow-200 px-2 py-0.5 text-sm font-medium uppercase text-gray-800">
              NEW
            </span>
          </span>
          <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer transition-all">
            <span className="flex gap-2 items-center justify-center text-3xl font-bold">
              <img
                src={test}
                alt="user"
                className="w-15 h-12 object-cover rounded-sm"
              />
              AYURGURU
            </span>
          </span>
        </div>
      </div>

      {Mobile && (
        <span
          className="border bg-gray-600 border-gray-600 text-white m-2 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
          title="Close sidebar"
          onClick={() => setMobile(!Mobile)}
        >
          <MdClose fontSize={30} />
        </span>
      )}
    </div>
  );
}

export default Mobile;
