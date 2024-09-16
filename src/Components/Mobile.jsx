import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftClose } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import test from "../assets/test.png";

function Mobile() {
  const { Mobile, setMobile, handleQuery } = useContext(ContextApp);
  return (
    <div className="absolute left-0 top-0 w-full z-50  bg-black/40 flex justify-between items-start">
      <div
        className={
          Mobile
            ? "h-screen bg-leftNav w-[300px]  flex items-center justify-between p-2 text-white flex-col translate-x-0"
            : "hidden"
        }
      >
        <div className="flex flex-col items-center justify-between gap-2 w-full">
          <div className="flex items-center w-full gap-2">
            <span
              className="border border-gray-600 bg-gray-600 rounded-xl w-full py-2 text-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
              onClick={() => console.log("Personalized Chat clicked")}
            >
              <AiOutlinePlus fontSize={25} />
              New Chat
            </span>
          </div>
        </div>
        {/* middle section  */}
        {/* Middle section */}
        <div className="h-[80%] w-full p-2 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
          {/* Example messages */}
          <span
            className="rounded-lg w-full bg-gray-600 py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap"
            value={"What is Programming?"}
            onClick={handleQuery}
          >
            <span className="flex gap-2 items-center justify-center text-base">
              <FiMessageSquare />
              <span className="text-md">What is JanAushadhi ?</span>
            </span>
            <RiDeleteBinLine className="text-white" fontSize={20} />{" "}
            {/* Delete icon */}
          </span>
          <span
            className="rounded-lg w-full bg-gray-600 py-3 px-2 text-xs my-2 flex gap-2 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap"
            value={"How to rely on Ayurveda?"}
            onClick={handleQuery}
          >
            <span className="flex gap-2 items-center justify-center text-base">
              <FiMessageSquare />
              <span className="text-md">How to rely on Ayurveda ?</span>
            </span>
            <RiDeleteBinLine fontSize={20} className="text-white" />{" "}
            {/* Delete icon */}
          </span>
        </div>
        {/* bottom section  */}
        <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2">
          <span className="rounded-xl bg-gray-600 w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300">
            <span className="flex gap-2 items-center justify-center text-lg">
              <BsChatDots />
            </span>
            <span className="text-lg">Personalized Chat</span>
            <span className="rounded-md bg-yellow-200 px-2 py-0.5 text-sm font-medium uppercase text-gray-800">
              NEW
            </span>
          </span>
          <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer transition-all">
            <span className="flex gap-2 items-center justify-center text-3xl font-bold">
              <img
                src={test}
                alt="user"
                className="w-15 h-12 object-cover rounded-sm"
              />
              AYURGURU
            </span>
            <span className="rounded-md px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500"></span>
          </span>
        </div>
      </div>
      {Mobile && (
        <span
          className="border bg-gray-600 border-gray-600 text-white m-2 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
          title="Close sidebar"
          onClick={() => setMobile(!Mobile)}
        >
          <MdClose fontSize={30} />
        </span>
      )}
    </div>
  );
}

export default Mobile;
