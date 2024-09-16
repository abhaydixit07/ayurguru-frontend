import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri"; // Import the delete icon
import { ContextApp } from "../utils/Context";
import test from "../assets/test.png";
import { BsChatDots } from "react-icons/bs";

function LeftNav() {
  const { setShowSlide, showSlide, handleQuery } = useContext(ContextApp);

  return (
    <div
      className={
        !showSlide
          ? "h-100vh bg-leftNav w-[300px] border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0"
          : "hidden"
      }
    >
      {/* Top section */}
      <div className="flex flex-col items-start justify-start w-full gap-2">
        {/* Personalized Chat button with Close Sidebar */}
        <div className="flex items-center w-full gap-2">
          {/* Personalized Chat button */}
          <span
            className="border border-gray-600 bg-gray-600 rounded-xl w-[80%] py-2 text-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
            onClick={() => console.log("Personalized Chat clicked")}
          >
            <AiOutlinePlus fontSize={25} />
            New Chat
          </span>
          {/* Close sidebar button */}
          <span
            className="border bg-gray-600 border-gray-600 rounded-xl px-3 py-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-800 duration-200"
            title="Close sidebar"
            onClick={() => setShowSlide(!showSlide)}
          >
            <LuPanelLeftClose fontSize={24} />
          </span>
        </div>
      </div>

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

      {/* Bottom section */}
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
  );
}

export default LeftNav;
