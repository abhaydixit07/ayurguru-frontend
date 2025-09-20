import { useContext, useState, useEffect } from "react";
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
          `${import.meta.env.VITE_BACKEND_URL}/api/conversations`,
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Conversations fetched:", response.data);
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
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New conversation created:", response.data);
      setConversations([...conversations, response.data]);
    } catch (error) {
      console.error("Error creating new conversation", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/conversations/${conversationId}`,
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
      className={`h-[100dvh] bg-emerald-600 backdrop-blur-[1px] hidden lg:flex items-center justify-between text-white flex-col overflow-hidden transition-all duration-300 ease-out border-r z-10 p-3 ${
        showSlide
          ? "w-0 border-transparent opacity-0 pointer-events-none"
          : "w-[300px] border-white/20 opacity-100 pointer-events-auto"
      }`}
    >
      <div className={`w-full h-full flex flex-col transition-opacity duration-300 ${showSlide ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-start justify-start w-full gap-2">
        <div className="flex items-center w-full gap-2">
          <span
            className="border border-white/20 bg-white/10 hover:bg-white/15 rounded-xl w-[80%] py-2 text-lg flex gap-2 items-center justify-center cursor-pointer duration-200 transition-colors font-spacegroteskmedium"
            onClick={() => handleNewChat()}
          >
            <AiOutlinePlus fontSize={25} />
            <span className="font-spacegrotesksemibold">New Chat</span>
          </span>
          <span
            className="border border-white/20 bg-white/10 hover:bg-white/15 rounded-xl px-3 py-[9px] flex items-center justify-center cursor-pointer duration-200"
            title="Close sidebar"
            onClick={() => setShowSlide(!showSlide)}
          >
            <LuPanelLeftClose fontSize={24} />
          </span>
        </div>
      </div>

      <div className="w-full p-2 flex-1 min-h-0 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <div
              key={conversation.conversationId}
              className="w-full flex items-center justify-between my-2"
            >
              <span
                className="rounded-lg w-full bg-white/10 hover:bg-white/15 py-3 px-3 text-xs flex gap-2 items-center cursor-pointer transition-all duration-200 overflow-hidden truncate whitespace-nowrap group"
                onClick={() => handleConversationClick(conversation)}
              >
                <span className="flex gap-2 items-center justify-start text-base text-white/90">
                  <FiMessageSquare />
                  <span className="text-md font-spacegroteskregular">
                    {conversation.chats[0]?.message || "No chats yet"}
                  </span>
                </span>
              </span>
              <span
                className="border border-white/20 bg-white/10 hover:bg-white/15 rounded-xl px-3 ml-2 py-[9px] flex items-center justify-center cursor-pointer duration-200"
                title="Close sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conversation.conversationId);
                }}
              >
                <RiDeleteBinLine className="text-white" fontSize={25} />
              </span>
            </div>
          ))
        ) : (
          <span className="text-white/90 font-spacegroteskmedium">No conversations yet</span>
        )}
      </div>

      <div className="w-full border-t border-white/20 flex flex-col gap-2 items-center justify-center p-2">
        <span className="rounded-xl bg-white/10 hover:bg-white/15 w-full py-2 px-2 text-xs flex gap-2 items-center justify-between cursor-pointer transition-all duration-200"
          onClick={() => handlePersonalizedChatClick(userId)}>
          <span className="flex gap-2 items-center justify-center text-lg text-white/90">
            <BsChatDots />
          </span>
          <span className="text-lg font-spacegrotesksemibold">Personalized Chat</span>
          <span className="rounded-md bg-yellow-200 px-2 py-0.5 text-sm font-medium uppercase text-gray-800">
            NEW
          </span>
        </span>
        <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer transition-all">
          <span className="flex gap-2 items-center justify-center text-2xl font-spacegroteskbold tracking-wide">
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
    </div>
  );
}

export default LeftNav;
