import React from "react";
import LeftNav from "../Components/LeftNav";
import ChatContainer from "../Components/ChatContainer";
import Mobile from '../Components/Mobile.jsx';


function Home() {
  return (
    <div className="flex w-screen relative">
      <LeftNav />
      <ChatContainer />
      <span className="flex lg:hidden">
        <Mobile />
      </span>
    </div>
  );
}

export default Home;
