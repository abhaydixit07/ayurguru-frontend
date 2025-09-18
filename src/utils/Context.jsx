import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [personalizedChatisSelected, setPersonalizedChatisSelected] =
    useState(false);
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

  const handlePersonalizedChatClick = async (userId) => {
    setChats([]);
    setPersonalizedChatisSelected(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/checkPersonalizedChats`,
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
        }
      );
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/getPersonalizedChats`,
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching personalized chats", error);
    }
  };

  const handlePersonalizedSend = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const currentChatValue = chatValue;
    setChatValue("");

    try {
      const summaryResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/getPersonalizedFileText`,
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
        }
      );

      const documentSummary =
        summaryResponse.data.length > 0
          ? summaryResponse.data.map((item) => item.text).join(" ")
          : "No document summary available.";

      const chatHistory = chats.map((chat) => ({
        role: chat.sender === "bot" ? "assistant" : "user",
        content: chat.message,
      }));

      setChats((prevChats) => [
        ...prevChats,
        { message: currentChatValue, sender: "user" },
      ]);
      console.log(documentSummary);
      const response = await axios.post(
        `${import.meta.env.VITE_AI_API_URL
        }/generate_response_with_context`,
        {
          message: currentChatValue,
          auth_message: import.meta.env.VITE_AUTH_MESSAGE,
          document_summary: documentSummary,
          chat_history: chatHistory,
        }
      );

      setChats((prevChats) => [
        ...prevChats,
        { message: response.data.response, sender: "bot" },
      ]);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/addPersonalizedChat`,
        {
          chat: currentChatValue,
          sender: "user",
          userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
        }
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/addPersonalizedChat`,
        {
          chat: response.data.response,
          sender: "bot",
          userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
        }
      );

      setChatValue("");
    } catch (error) {
      console.error("Error sending personalized chat:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleKeyPress2 = (e) => {
    if (e.key === "Enter") {
      handlePersonalizedSend();
    }
  };

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const currentChatValue = chatValue;
    setChatValue("");

    try {
      setChats((prevChats) => [
        ...prevChats,
        { message: currentChatValue, sender: "user" },
      ]);

      const chatHistory = chats.map((chat) => ({
        role: chat.sender === "bot" ? "assistant" : "user",
        content: chat.message,
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_AI_API_URL
        }/generate_response`,
        {
          message: currentChatValue,
          auth_message: import.meta.env.VITE_AUTH_MESSAGE,
          chat_history: chatHistory,
        }
      );

      setChats((prevChats) => [
        ...prevChats,
        { message: response.data.response, sender: "bot" },
      ]);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/conversations/${currentConversationId}`,
        { message: currentChatValue, sender: "user", userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/conversations/${currentConversationId}`,
        { message: response.data.response, sender: "bot", userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleConversationClick = async (conversation) => {
    setChats([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setCurrentConversationId(conversation.conversationId);
    setPersonalizedChatisSelected(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/conversations/${conversation.conversationId
        }`,
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
        handlePersonalizedChatClick,
        handlePersonalizedSend,
        handleKeyPress2,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;
