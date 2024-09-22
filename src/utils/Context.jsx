import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { s } from "framer-motion/client";
export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [chatValue, setChatValue] = useState("");
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


  const handlePersonalizedChatClick = async (userId) => {
    setChats([]);
    setPersonalizedChatisSelected(true);
    try{
      const response = await axios.post("http://localhost:5000/api/personalizedChats/getPersonalizedChats", {
        userId: userId,
        authMessage: import.meta.env.VITE_AUTH_MESSAGE
      });
      console.log("Personalized Chats fetched:", response.data);
      setChats(response.data);
    }
    catch(error){
      console.error("Error fetching personalized chats", error);
    }
  };

  
  
  const handlePersonalizedSend = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    try {
      // Save the user's message first
      setChats(prevChats => [...prevChats, { message: chatValue, sender: "user" }]);
      
      // Generate bot's response using the Flask API
      const response = await axios.post('https://ayurguru-flask-api.vercel.app/generate_response', {
        message: chatValue,
        auth_message: import.meta.env.VITE_AUTH_MESSAGE
      });
  
      // Append bot's response to chats
      setChats((prevChats) => [
        ...prevChats,
        { message: response.data.response, sender: "bot" },
      ]);
  
      // Save the user's message to the DB
      await axios.post(
        `http://localhost:5000/api/personalizedChats/addPersonalizedChat`,
        { chat: chatValue, sender: "user", userId, authMessage: import.meta.env.VITE_AUTH_MESSAGE }
      );
  
      // Save bot's response to the DB
      await axios.post(
        `http://localhost:5000/api/personalizedChats/addPersonalizedChat`,
        { chat: response.data.response, sender: "bot", userId, authMessage: import.meta.env.VITE_AUTH_MESSAGE },
  
      );
  
      // Clear the input after sending
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
  }

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      // Save the user's message first
      setChats(prevChats => [...prevChats, { message: chatValue, sender: "user" }]);
      
  
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
      setChatValue("");
      await axios.post(
        `http://localhost:5000/api/conversations/${currentConversationId}`,
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
        handlePersonalizedChatClick,
        handlePersonalizedSend,
        handleKeyPress2
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;
