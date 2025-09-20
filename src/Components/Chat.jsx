import { useContext, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ContextApp } from "../utils/Context";
import chatIcon from "../assets/chatIcon.png";
import userIcon from "../assets/userIcon.png";

function Chat() {
  const { chats, msgEnd, personalizedChatisSelected } = useContext(ContextApp);
  const prevChatsLength = useRef(chats?.length || 0);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  // Immediate scroll when chats first load or when length changes significantly
  useEffect(() => {
    if (chats && chats.length > 0 && msgEnd.current) {
      // Check if this is initial load (big jump in length) or just one new message
      const lengthDiff = chats.length - prevChatsLength.current;
      
      if (lengthDiff > 2) {
        // Initial load - immediate scroll
        setTimeout(() => {
          msgEnd.current.scrollIntoView({ behavior: "auto" });
        }, 100);
      } else if (lengthDiff > 0) {
        // New message - smooth scroll
        setTimeout(() => {
          msgEnd.current.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
      
      prevChatsLength.current = chats.length;
    }
  }, [chats?.length]);

  // Force scroll when switching to personalized chat with existing messages
  useEffect(() => {
    if (personalizedChatisSelected && chats && chats.length > 0 && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "auto" });
      }, 200);
    }
  }, [personalizedChatisSelected]);

  // Initial mount scroll - ensure we scroll to bottom when component first renders with data
  useEffect(() => {
    if (chats && chats.length > 0 && msgEnd.current) {
      // Use auto behavior for initial scroll (faster)
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  }, []); // Only run on mount

  return (
    <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll">
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
        {chats?.map((msg, i) => (
          <div
            key={msg._id?.$oid || i}
            className={`flex items-center gap-2 lg:gap-5 my-2 p-3 rounded-2xl max-w-[80%] ${msg.sender === "user" ? "bg-emerald-600 self-end" : "bg-gray-800/80 self-start"
              }`}
          >
            {msg.sender === "user" ? (
              <>
                <p className="text-white font-spacegroteskregular text-[18px] whitespace-pre-wrap">{msg.message}</p>
                <img
                  src={userIcon}
                  alt="user"
                  className="w-10 h-10 rounded object-cover"
                />
              </>
            ) : (
              <>
                <img
                  src={chatIcon}
                  alt="bot"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="text-white text-[18px] font-spacegroteskregular whitespace-pre-wrap">
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;
