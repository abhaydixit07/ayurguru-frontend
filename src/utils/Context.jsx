import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [personalizedChatResult, setPersonalizedChatResult] = useState(null);
  const [personalizedclicked, setPersonalizedClicked] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [personalizedChatisSelected, setPersonalizedChatisSelected] = useState(false);
  const [message, setMessage] = useState([
    // {
    //   text: "Hi, I am AyurChatBot. How can I help you today?. I specialie in Ayurvedic medicine and treatments. You can ask me anything related to Ayurveda.",
    //   isBot: true,
    // },
    // {
    //   text: "Hi My name is John Doe, I am a software engineer. I am looking for a job in your company. Can you help me with that?",
    //   isBot: false,
    // }
  ]);
  const [chats, setChats] = useState([]);
  const msgEnd = useRef(null);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [message]);

  // const handlePersonalizedChatClick = async (userId) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/checkPersonalizedChats",
  //       { userId: userId, authMessage: import.meta.env.VITE_AUTH_MESSAGE }
  //     );
  //     setPersonalizedChatResult(response.data.result);
  //   } catch (error) {
  //     console.error("Error checking personalized chat", error);
  //   }
  // };

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      // Save the user's message first
      setChats(prevChats => [...prevChats, { message: chatValue, sender: "user" }]);
      setChatValue("");
  
      const response = await axios.post('https://ayurguru-flask-api.vercel.app/generate_response', {
        message: chatValue,
        auth_message: import.meta.env.VITE_AUTH_MESSAGE
      });
  
       
  
      // Save bot's response in chats
      setChats((prevChats) => [
        ...prevChats,
        { message: response.data.response, sender: "bot" },
      ]);

      // Send both messages to your backend server
      await axios.post(
        `http://localhost:5000/api/conversations/${currentConversationId}`,
        { message: chatValue, sender: "user", userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        `http://localhost:5000/api/conversations/${currentConversationId}`,
        { message: response.data.response, sender: "bot", userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  
  const handlePersonalizedChatClick = async () => {
    setPersonalizedChatisSelected(!personalizedChatisSelected);
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleConversationClick = async (conversation) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setCurrentConversationId(conversation.conversationId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/conversations/${conversation.conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          },
        }
      );
      setChats(response.data);
      console.log("Conversation clicked:", response.data);
    } catch (error) {
      console.error("Error fetching conversation", error);
    }
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
        handleConversationClick,
        chats,
        setChats,
        currentConversationId,
        personalizedChatisSelected,
        handlePersonalizedChatClick
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;
