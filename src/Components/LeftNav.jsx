import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import axios from "axios";
import { ContextApp } from "../utils/Context";
import test from "../assets/test.png";

function LeftNav() {
  const { setShowSlide, showSlide, handleConversationClick, handlePersonalizedChatClick } = useContext(ContextApp);
  const [conversations, setConversations] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/conversations",
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Conversations fetched:", response.data);
        setConversations(response.data); // Update state with fetched conversations
      } catch (error) {
        console.error("Error fetching conversations", error);
      }
    };
    fetchConversations();
  }, [token, userId]);
  const handleNewChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/conversations/new",
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New conversation created:", response.data);
      setConversations([...conversations, response.data]); // Add new conversation to state
    } catch (error) {
      console.error("Error creating new conversation", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/conversations/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          userId: userId,
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
    <div
      className={
        !showSlide
          ? "h-100vh bg-leftNav w-[300px] border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0"
          : "hidden"
      }
    >
      {/* Top section */}
      <div className="flex flex-col items-start justify-start w-full gap-2">
        <div className="flex items-center w-full gap-2">
          <span
            className="border border-gray-600 bg-gray-600 rounded-xl w-[80%] py-2 text-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
            onClick={() => handleNewChat()}
          >
            <AiOutlinePlus fontSize={25} />
            New Chat
          </span>
          <span
            className="border bg-gray-600 border-gray-600 rounded-xl px-3 py-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
            title="Close sidebar"
            onClick={() => setShowSlide(!showSlide)}
          >
            <LuPanelLeftClose fontSize={24} />
          </span>
        </div>
      </div>

      {/* Middle section */}
      <div className="h-[80%] w-full p-2 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <div
              key={conversation.conversationId}
              className="w-full flex items-center justify-between my-2"
            >
              <span
                className="rounded-lg w-full bg-gray-600 py-3 px-2 text-xs flex gap-1 items-center cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap"
                onClick={() => handleConversationClick(conversation)}
              >
                <span className="flex gap-2 items-center justify-start text-base">
                  <FiMessageSquare />
                  <span className="text-md">
                    {conversation.chats[0]?.message || "No chats yet"}
                  </span>
                </span>
              </span>
              <span
                className="border bg-gray-600 border-gray-600 rounded-xl px-3 ml-2 py-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
                title="Close sidebar"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click on parent span
                  deleteConversation(conversation.conversationId);
                }}
              >
                <RiDeleteBinLine className="text-white" fontSize={25} />
              </span>
            </div>
          ))
        ) : (
          <span className="text-white font-bold">No conversations yet</span>
        )}
      </div>

      {/* Bottom section */}
      <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2">
        <span className="rounded-xl bg-gray-600 w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300"
        onClick={()=>handlePersonalizedChatClick(userId)}>
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
          <span className="rounded-md px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500"></span>
        </span>
      </div>
    </div>
  );
}

export default LeftNav;
