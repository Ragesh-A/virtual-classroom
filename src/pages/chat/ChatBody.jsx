import { useState } from "react";
import Chat from "../../components/chat/Chat";
import SendBottomBar from "../../components/chat/SendBottomBar";

const ChatBody = ({ chat, currentUserId, friend }) => {

  const [messges, setMessages] = useState([])
  // get the chats from the server

  return (
    <div className="bg-white rounded-md  pb-16 h-full relative">
      {!friend ? <div className="w-full h-full flex justify-center items-center">No selected person</div> :( 
        <>
        <div className="overflow-y-scroll h-full scroll">
        <Chat user={true} message={'hi'}/>
        <Chat user={false} message={'hi'}/>
        <Chat user={false} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        <Chat user={true} message={'hi'}/>
        </div>
        
        
        </>
      )}
      {friend && <SendBottomBar />}
    </div>
  )
};

export default ChatBody;