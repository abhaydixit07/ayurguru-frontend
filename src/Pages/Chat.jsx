import LeftNav from "../Components/LeftNav";
import ChatContainer from "../Components/ChatContainer";
import Mobile from "../Components/Mobile.jsx";

function Chat() {
  return (
    <div className="flex w-screen relative h-[100dvh] overflow-hidden">
      <LeftNav />
      <ChatContainer />
      <span className="flex lg:hidden">
        <Mobile />
      </span>
    </div>
  );
}

export default Chat;
