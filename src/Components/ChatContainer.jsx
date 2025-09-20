import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import UploadOnlyComponent from "./UploadOnlyComponent";
import FilesViewOnlyComponent from "./FilesViewOnlyComponent";
import { FaPaperclip } from "react-icons/fa";
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
  const [closingUpload, setClosingUpload] = useState(false);
  const [closingFiles, setClosingFiles] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (chatValue.length > 0 && msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatValue, msgEnd]);

  useEffect(() => {
    if (!showAttachmentModal && !showFilesModal && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showAttachmentModal, showFilesModal, msgEnd]);

  useEffect(() => {
    if (personalizedChatisSelected && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [personalizedChatisSelected, msgEnd]);

  useEffect(() => {
    if (chats && chats.length > 0 && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [chats, msgEnd]);

  useEffect(() => {
    if ((personalizedChatisSelected || currentConversationId) && chats && chats.length > 0 && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [personalizedChatisSelected, currentConversationId]);

  const scrollToBottom = () => {
    if (msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handlePersonalizedSendWithScroll = () => {
    handlePersonalizedSend();
    scrollToBottom();
  };

  const handleKeyPress2WithScroll = (e) => {
    if (e.key === "Enter") {
      handlePersonalizedSendWithScroll();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const isMobileViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

  const closeUploadDialog = () => {
    if (isMobileViewport()) {
      setClosingUpload(true);
      setTimeout(() => {
        setClosingUpload(false);
        setShowAttachmentModal(false);
      }, 240);
    } else {
      setShowAttachmentModal(false);
    }
  };

  const closeFilesDialog = () => {
    if (isMobileViewport()) {
      setClosingFiles(true);
      setTimeout(() => {
        setClosingFiles(false);
        setShowFilesModal(false);
      }, 240);
    } else {
      setShowFilesModal(false);
    }
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
        `h-[100dvh] flex-1 flex items-start justify-between flex-col p-2 transition-all duration-300 ease-out w-full`
      }
    >
      {showSlide && (
        <span
          className="rounded-xl px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors duration-200 z-20 absolute top-2 left-2"
          title="Open sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftOpen fontSize={23} />
        </span>
      )}

      <span
        className="rounded-xl mt-2 border border-white/20 bg-emerald-600 hover:bg-emerald-700 lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 px-3 py-[9px] transition-colors duration-200"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        <LuPanelLeftOpen fontSize={24} />
      </span>

      <div className="absolute top-2 right-2 flex gap-2 z-30">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl shadow-md transition-colors duration-200"
          title="Home"
          onClick={() => navigate("/")}
        >
          <FaHome fontSize={30} />
        </button>

        {personalizedChatisSelected && (
          <button
            className="bg-emerald-600 text-white p-2 rounded-xl shadow-md hover:bg-emerald-800 transition-all duration-300"
            title="View All Files"
            onClick={() => setShowFilesModal(true)}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
            </svg>
          </button>
        )}

        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl shadow-md transition-colors duration-200"
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
            <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-3/5 xl:w-2/3">
              <div className="flex items-center gap-1 pl-2">
                <button
                  onClick={() => setShowAttachmentModal(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-2"
                  title="Upload Document"
                >
                  <FaPaperclip className="text-md" />
                  <span className="hidden lg:inline text-sm">Upload</span>
                </button>

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

          {showAttachmentModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fadeIn">
              <div
                role="dialog"
                aria-labelledby="uploadDialogTitle"
                className={`w-full sm:w-auto bg-gradient-to-br from-gray-50 to-white rounded-t-2xl sm:rounded-3xl shadow-2xl sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[85vh] sm:max-h-[95vh] overflow-hidden transform border border-gray-200 
                  sm:animate-slideUp ${closingUpload ? 'animate-sheet-down' : 'animate-sheet-up'}`}
              >
                <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-4 sm:px-6 md:px-8 sm:py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 id="uploadDialogTitle" className="text-xl sm:text-2xl font-spacegroteskbold text-white">Upload New Document</h3>
                      <p className="text-emerald-100 mt-1 font-spacegroteskregular text-sm sm:text-base">Add your medical files or reports for personalized analysis</p>
                    </div>
                    <button
                      onClick={closeUploadDialog}
                      className="text-white/85 hover:text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-200"
                      aria-label="Close upload dialog"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-96px)] sm:max-h-[calc(95vh-140px)] bg-gradient-to-b from-gray-50 to-white">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                    <UploadOnlyComponent userId={userId} onSuccess={() => setShowAttachmentModal(false)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {showFilesModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fadeIn">
              <div
                role="dialog"
                aria-labelledby="filesDialogTitle"
                className={`w-full sm:w-auto bg-gradient-to-br from-gray-50 to-white rounded-t-2xl sm:rounded-3xl shadow-2xl sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl max-h-[85vh] sm:max-h-[95vh] overflow-hidden transform border border-gray-200 
                  sm:animate-slideUp ${closingFiles ? 'animate-sheet-down' : 'animate-sheet-up'}`}
              >
                <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-4 sm:px-6 md:px-8 sm:py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 id="filesDialogTitle" className="text-xl sm:text-2xl font-spacegroteskbold text-white">Your Medical Documents</h3>
                      <p className="text-emerald-100 mt-1 font-spacegroteskregular text-sm sm:text-base">View, download, and manage all your uploaded files</p>
                    </div>
                    <button
                      onClick={closeFilesDialog}
                      className="text-white/85 hover:text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-200"
                      aria-label="Close files dialog"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-96px)] sm:max-h-[calc(95vh-140px)] bg-gradient-to-b from-gray-50 to-white">
                  <FilesViewOnlyComponent userId={userId} showHeading={false} showSubheadingCount={false} summaryPosition="top" />
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
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
          <h1 className="md:text-6xl text-4xl text-gray-800 font-spacegroteskbold drop-shadow-3xl">
            AyurGuru
          </h1>
          <p className="md:text-2xl text-lg text-gray-500 mt-4 drop-shadow-md font-spacegroteskregular">
            Your Personalized Ayurvedic Guide
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
