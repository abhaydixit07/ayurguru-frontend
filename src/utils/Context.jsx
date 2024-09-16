import { createContext, useEffect, useRef, useState } from "react";
// Removed import for sendMsgToAI
export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [message, setMessage] = useState([
    {
      text: "Hi, I am AyurChatBot. How can I help you today?. I specialie in Ayurvedic medicine and treatments. You can ask me anything related to Ayurveda.",
      isBot: true,
    },
    {
      text: "Hi My name is John Doe, I am a software engineer. I am looking for a job in your company. Can you help me with that?",
      isBot: false,
    }
  ]);
  const msgEnd = useRef(null);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [message]);

  // button Click function
  const handleSend = async () => {
    const text = chatValue;
    setChatValue("");
    setMessage([...message, { text, isBot: false }]);
    // Removed call to sendMsgToAI
  };

  // Enter Click function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Query Click function
  const handleConversationClick
   = async (e) => {
    const text = e.target.innerText;
    setMessage([...message, { text, isBot: false }]);
    // Removed call to sendMsgToAI
  };

  return (
    <ContextApp.Provider
      value={{
        showSlide,
        setShowSlide,
        Mobile,
        setMobile,
        chatValue,
        setChatValue,
        handleSend,
        message,
        msgEnd,
        handleKeyPress,
        handleConversationClick
        ,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;