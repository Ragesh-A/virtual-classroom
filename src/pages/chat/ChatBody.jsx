import { useEffect, useRef, useState } from "react";
import Chat from "../../components/chat/Chat";
import SendBottomBar from "../../components/chat/SendBottomBar";
import chatServices from "../../services/chatServices";

const ChatBody = ({ classId , currentUserId, friend, conversationId, socket }) => {

  const [messages, setMessages] = useState([])
  const [arrivalMessages, setArrivalMessages] = useState(null)
  const scrollRef = useRef()
  // get the chats from the server
  useEffect(()=>{
    //get the  conversation from the server with the conversation id and as well as  the class id change the back end also
    const promise = chatServices.getMessages(conversationId);
    promise.then(res=>{
      if (res?.success) {
        setMessages(res.success.chats);
      }
    })
  }, [conversationId])
  
  const sendedMessage = (message) => {
    setMessages([...messages, message])
    socket?.current?.emit('send-message',{
      senderId: currentUserId ,
      message: message.message,
      classId,
      receiverId: friend?._id
    })
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  console.log(arrivalMessages, "arrivales");
  useEffect(()=>{
    socket?.current?.on('get-message', data => {
      setArrivalMessages({
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now(),
        _id: Date.now()
      })
    })
  }, [])

  useEffect(()=> {
    arrivalMessages && arrivalMessages.senderId === friend?._id && setMessages((prev) => [...prev, arrivalMessages])
  }, [arrivalMessages, friend])

  return (
    <div className="bg-white rounded-md  pb-16 h-full relative">
      {!conversationId ? <div className="w-full h-full flex justify-center items-center">No selected person</div> :( 
        <>
        <div className="overflow-y-scroll h-full scroll">
          {
            messages.map((message) => (
              <div ref={scrollRef}  key={message._id}>
                <Chat user={currentUserId} message={message}/>
              </div>
            ))
          }
        
        </div>
        
        
        </>
      )}
      {conversationId && <SendBottomBar chatId={conversationId} sendedMessage={sendedMessage}/>}
    </div>
  )
};

export default ChatBody;