import React, { useContext, useEffect } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Fileupload from "../Pages/fileUpload";
import MobileFileUpload from "../Pages/mobileFileUpload";
import { FaFileUpload } from "react-icons/fa";
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
  } = useContext(ContextApp);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
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
        className="rounded-xl bg-gray-600 px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600 hover:bg-gray-800 duration-200"
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
        {personalizedChatisSelected ? (
          <div className="flex items-center justify-center lg:hidden">
            <button
              className="btn bg-gray-600 text-white p-2 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <FaFileUpload fontSize={30} />
            </button>
            <dialog id="my_modal_3" className="modal p-4 rounded-lg">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="text-md pt-4 text-center font-spacegrotesksemibold">
                  Upload Your Document or Image
                </h3>
                <p className="py-4">
                  <MobileFileUpload userId={userId} />
                </p>
              </div>
            </dialog>
          </div>
        ) : null}
      </div>

      {personalizedChatisSelected ? (
        <>
          <div className="w-full h-full lg:flex items-center justify-center hidden">
            <Fileupload userId={userId} />
            <div className="flex flex-col h-[100%]">
              <Chat />
              <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
                <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-2/5 xl:w-1/2">
                  <input
                    type="text"
                    placeholder="Send a message"
                    className="h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
                    value={chatValue}
                    onChange={(e) => setChatValue(e.target.value)}
                    onKeyUp={handleKeyPress2}
                  />
                  <RiSendPlane2Fill
                    title="send message"
                    className={
                      chatValue.length <= 0
                        ? "text-gray-400 cursor-auto mx-3 text-xl"
                        : "text-white cursor-pointer mx-3 text-3xl p-1 rounded shadow-md"
                    }
                    onClick={handlePersonalizedSend}
                  />
                </span>
                <p className="lg:text-xs text-gray-400 text-center text-[10px]">
                  *Ayurvedic Suggestions are based on AI and ML. Please consult
                  a doctor if you have any health issues. We are not responsible
                  for any wrong suggestions given by the AI*
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-full lg:hidden items-center justify-center flex overflow-y-hidden">
            <div className="flex flex-col h-[100%]">
              <Chat />
              <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
                <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-2/5 xl:w-1/2">
                  <input
                    type="text"
                    placeholder="Send a message"
                    className="h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
                    value={chatValue}
                    onChange={(e) => setChatValue(e.target.value)}
                    onKeyUp={handleKeyPress2}
                  />
                  <RiSendPlane2Fill
                    title="send message"
                    className={
                      chatValue.length <= 0
                        ? "text-gray-400 cursor-auto mx-3 text-xl"
                        : "text-white cursor-pointer mx-3 text-3xl p-1 rounded shadow-md"
                    }
                    onClick={handlePersonalizedSend}
                  />
                </span>
                <p className="lg:text-xs text-gray-400 text-center text-[10px]">
                  *Ayurvedic Suggestions are based on AI and ML. Please consult
                  a doctor if you have any health issues. We are not responsible
                  for any wrong suggestions given by the AI*
                </p>
              </div>
            </div>
          </div>
        </>
      ) : currentConversationId ? (
        <>
          <Chat />

          <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
            <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-2/5 xl:w-1/2">
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
                    ? "text-gray-400 cursor-auto mx-3 text-xl"
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
