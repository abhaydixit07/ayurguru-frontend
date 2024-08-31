import React, { useContext } from "react";
import { ContextApp } from "../utils/Context";
import chatIcon from "../assets/chatIcon.png";
import userIcon from "../assets/userIcon.png";

function Chat() {
  const { message, msgEnd } = useContext(ContextApp);
  return (
    <div className="w-full h-[85%] flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll">
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
        {message?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 lg:gap-5 my-2 p-3 rounded-2xl max-w-[80%] ${
              msg.isBot ? "bg-gray-800/80 self-start" : "bg-blue-600 self-end"
            }`}
          >
            {msg.isBot ? (
              <>
                <img
                  src={chatIcon}
                  alt="bot"
                  className="w-10 h-10 rounded object-cover"
                />
                <p className="text-white text-[18px]">{msg?.text}</p>
              </>
            ) : (
              <>
                <p className="text-white text-[18px]">{msg?.text}</p>
                <img
                  src={userIcon}
                  alt="user"
                  className="w-10 h-10 rounded object-cover"
                />
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
