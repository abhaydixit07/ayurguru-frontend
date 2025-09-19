import React, { useContext, useEffect, useState } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Fileupload from "../Pages/fileUpload";
import MobileFileUpload from "../Pages/mobileFileUpload";
import UploadOnlyComponent from "./UploadOnlyComponent";
import FilesViewOnlyComponent from "./FilesViewOnlyComponent";
import { FaFileUpload, FaPaperclip } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import axios from "axios";

function ChatContainer() {
  const {
    setShowSlide,
    showSlide,
    setMobile,
    Mobile,
    chatValue,
    setChatValue,
    handleSend,
    handleKeyPress,
    handleKeyPress2,
    currentConversationId,
    handlePersonalizedSend,
    personalizedChatisSelected,
    msgEnd,
    chats,
  } = useContext(ContextApp);

  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  // Auto-scroll to bottom when user starts typing
  useEffect(() => {
    if (chatValue.length > 0 && msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatValue, msgEnd]);

  // Auto-scroll when modals close to show latest messages
  useEffect(() => {
    if (!showAttachmentModal && !showFilesModal && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showAttachmentModal, showFilesModal, msgEnd]);

  // Enhanced auto-scroll for personalized chat - scroll whenever chats update
  useEffect(() => {
    if (personalizedChatisSelected && msgEnd.current) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [personalizedChatisSelected, msgEnd]);

  // Universal auto-scroll: Scroll when chats change (initial load + new messages)
  useEffect(() => {
    if (chats && chats.length > 0 && msgEnd.current) {
      // Delay to ensure DOM is fully updated after state change
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [chats, msgEnd]);

  // Immediate scroll on chat mode switch for existing messages
  useEffect(() => {
    if ((personalizedChatisSelected || currentConversationId) && chats && chats.length > 0 && msgEnd.current) {
      // Longer delay for mode switches to ensure UI is fully rendered
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [personalizedChatisSelected, currentConversationId]);

  // Force scroll on any message send
  const scrollToBottom = () => {
    if (msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Enhanced personalized send with scroll
  const handlePersonalizedSendWithScroll = () => {
    handlePersonalizedSend();
    scrollToBottom();
  };

  // Enhanced key press handler with scroll
  const handleKeyPress2WithScroll = (e) => {
    if (e.key === "Enter") {
      handlePersonalizedSendWithScroll();
    }
  };
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/is-auth`,
          {
            token: token,
          }
        );
        if (response.error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/signup");
      }
    };
    checkAuth();
  }, [token, navigate]);

  return (
    <div
      className={
        showSlide
          ? "h-[100dvh] w-screen flex items-start justify-between flex-col p-2"
          : "h-[100dvh] w-full lg:w-[calc(100%-300px)] flex items-start justify-between flex-col"
      }
    >
      {showSlide && (
        <span
          className="rounded-xl px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-800 duration-200 bg-gray-600"
          title="Open sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftOpen fontSize={23} />
        </span>
      )}

      <span
        className="rounded-xl mt-2 bg-gray-600 px-3 py-[9px]  lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600 hover:bg-gray-800 duration-200"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        <LuPanelLeftOpen fontSize={24} />
      </span>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="bg-gray-600 text-white p-2 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
          title="Home"
          onClick={() => navigate("/")}
        >
          <FaHome fontSize={30} />
        </button>

        <button
          className="bg-gray-600 text-white p-2 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
          title="Logout"
          onClick={handleLogout}
        >
          <BiLogOut fontSize={30} />
        </button>
      </div>

      {personalizedChatisSelected ? (
        <>
          <Chat />

          <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
            {/* Chat Input with Integrated Buttons */}
            <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-3/5 xl:w-2/3">
              {/* Left side buttons */}
              <div className="flex items-center gap-1 pl-2">
                <button
                  onClick={() => setShowAttachmentModal(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-2"
                  title="Upload Document"
                >
                  <FaPaperclip className="text-md" />
                  <span className="hidden lg:inline text-sm">Upload</span>
                </button>
                
                <button
                  onClick={() => setShowFilesModal(true)}
                  className="p-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-2"
                  title="View All Attachments"
                >
                  <HiViewGrid className="text-md" />
                  <span className="hidden lg:inline text-sm">View</span>
                </button>
                
                {/* Separator */}
                <div className="h-6 w-px bg-gray-500 mx-1"></div>
              </div>

              <input
                type="text"
                placeholder="Send a message"
                className="h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
                onKeyUp={handleKeyPress2WithScroll}
              />
              <RiSendPlane2Fill
                title="send message"
                className={
                  chatValue.length <= 0
                    ? "text-gray-400 cursor-auto mx-3 text-2xl"
                    : "text-white cursor-pointer mx-3 text-3xl p-1 rounded shadow-md"
                }
                onClick={handlePersonalizedSendWithScroll}
              />
            </span>
            
            <p className="lg:text-xs text-gray-400 text-center text-[10px]">
              *Ayurvedic Suggestions are based on AI and ML. Please consult a
              doctor if you have any health issues. We are not responsible for
              any wrong suggestions given by the AI*
            </p>
          </div>

          {/* Upload Modal - Only shows upload functionality */}
          {showAttachmentModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden transform animate-slideUp border border-gray-200">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Upload New Document</h3>
                      <p className="text-emerald-100 mt-1">Add your medical files or reports for personalized analysis</p>
                    </div>
                    <button
                      onClick={() => setShowAttachmentModal(false)}
                      className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                </div>

                {/* Content - Upload Only */}
                <div className="p-8 overflow-y-auto max-h-[calc(95vh-140px)] bg-gradient-to-b from-gray-50 to-white">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <UploadOnlyComponent userId={userId} onSuccess={() => setShowAttachmentModal(false)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Files View Modal - Only shows file list */}
          {showFilesModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden transform animate-slideUp border border-gray-200">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Your Medical Documents</h3>
                      <p className="text-blue-100 mt-1">View, download, and manage all your uploaded files</p>
                    </div>
                    <button
                      onClick={() => setShowFilesModal(false)}
                      className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                </div>

                {/* Content - Files List Only */}
                <div className="p-8 overflow-y-auto max-h-[calc(95vh-140px)] bg-gradient-to-b from-gray-50 to-white">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <FilesViewOnlyComponent userId={userId} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : currentConversationId ? (
        <>
          <Chat />

          <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
            <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-3/5 xl:w-2/3">
              <input
                type="text"
                placeholder="Send a message"
                className="h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <RiSendPlane2Fill
                title="send message"
                className={
                  chatValue.length <= 0
                    ? "text-gray-400 cursor-auto mx-3 text-2xl"
                    : "text-white cursor-pointer mx-3 text-3xl p-1 rounded shadow-md"
                }
                onClick={handleSend}
              />
            </span>
            <p className="lg:text-xs text-gray-400 text-center text-[10px]">
              *Ayurvedic Suggestions are based on AI and ML. Please consult a
              doctor if you have any health issues. We are not responsible for
              any wrong suggestions given by the AI*
            </p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-6xl text-gray-800 font-bold drop-shadow-3xl">
            AyurGuru
          </h1>
          <p className="text-2xl text-gray-500 mt-4 drop-shadow-md">
            Your Personalized Ayurvedic Guide
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
