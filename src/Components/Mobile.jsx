import { useContext, useEffect, useState } from "react";
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
  const [closing, setClosing] = useState(false);

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

  useEffect(() => {
    if (Mobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [Mobile]);

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

  if (!Mobile && !closing) return null;

  return (
    <div
      className="fixed inset-0 h-[100dvh] z-50 bg-black/40 flex justify-between items-start"
      onClick={() => {
        setClosing(true);
        setTimeout(() => { setClosing(false); setMobile(false); }, 240);
      }}
    >
      <div
        className={`h-[100dvh] bg-emerald-600 backdrop-blur-[1px] w-[300px] flex items-stretch justify-between p-2 pb-[env(safe-area-inset-bottom)] text-white flex-col ${closing ? 'animate-drawer-out' : 'animate-drawer-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center w-full gap-2">
          <span
            className="border border-white/20 bg-white/10 hover:bg-white/15 rounded-xl flex-1 py-2 text-lg flex gap-2 items-center justify-center cursor-pointer duration-200 font-spacegroteskmedium"
            onClick={handleNewChat}
          >
            <AiOutlinePlus fontSize={25} />
            <span className="font-spacegrotesksemibold">New Chat</span>
          </span>
          <button
            className="border border-white/20 bg-white/10 hover:bg-white/15 text-white rounded-xl px-3 py-[9px] flex items-center justify-center cursor-pointer duration-200"
            title="Close sidebar"
            onClick={() => {
              setClosing(true);
              setTimeout(() => { setClosing(false); setMobile(false); }, 240);
            }}
          >
            <MdClose fontSize={26} />
          </button>
        </div>

        <div className="w-full p-2 flex-1 min-h-0 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <span
                key={conversation.conversationId}
                className="rounded-lg w-full bg-white/10 hover:bg-white/15 py-3 px-3 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer transition-all duration-200 overflow-hidden truncate whitespace-nowrap"
                onClick={() => handleConversationClick(conversation)}
              >
                <span className="flex gap-2 items-center justify-center text-base">
                  <FiMessageSquare />
                  <span className="text-md font-spacegroteskregular">
                    {conversation.chats[0]?.message || "No chats yet"}
                  </span>
                </span>
                <RiDeleteBinLine
                  className="text-white"
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.conversationId);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-white/90 font-spacegroteskmedium">No conversations yet</span>
          )}
        </div>

        <div className="w-full border-t border-white/20 flex flex-col gap-2 items-center justify-center p-2">
          <span
            className="rounded-xl bg-white/10 hover:bg-white/15 w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer transition-all duration-200"
            onClick={() => handlePersonalizedChatClick(userId)}
          >
            <span className="flex gap-2 items-center justify-center text-lg">
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
          </span>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
