import React, { useContext, useEffect } from "react";
import { ContextApp } from "../utils/Context";
import chatIcon from "../assets/chatIcon.png";
import userIcon from "../assets/userIcon.png";

function Chat() {
  const { chats, msgEnd } = useContext(ContextApp);

  // Scroll to the bottom of the chat whenever `chats` updates
  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="w-full h-[85%] flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll">
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
      
        {chats?.map((msg, i) => (
          <div
            key={msg._id?.$oid || i}
            className={`flex items-center gap-2 lg:gap-5 my-2 p-3 rounded-2xl max-w-[80%] ${
              msg.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-800/80 self-start"
            }`}
          >
            {msg.sender === "user" ? (
              <>
                <p className="text-white text-[18px]">{msg.message}</p>
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
                <p className="text-white text-[18px]">{msg.message}</p>
              </>
            )}
          </div>
        ))}
        
        {/* This is the invisible div we scroll to */}
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;
