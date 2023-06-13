import { useEffect, useRef, useState } from 'react';
import Chat from '../../components/chat/Chat';
import SendBottomBar from '../../components/chat/SendBottomBar';
import chatServices from '../../services/chatServices';
import { useSelector } from 'react-redux';

const ChatBody = ({ classId, friend, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef();
  const { selectedChat } = useSelector((store) => store.chatMate);
  const { user } = useSelector((store) => store.user);
  const currentUserId = user?._id;
  // get the chats from the server v2
  useEffect(() => {
    //get the  conversation from the server with the conversation id and as well as  the class id change the back end also
    const promise = chatServices.getMessages(selectedChat._id);
    promise.then((res) => {
      if (res?.success) {
        setMessages(res.success.chats);
        socket.current.emit('join-chat', selectedChat._id);
      }
    });
  }, [selectedChat]);

  useEffect(() => {
    console.log('this is socket', socket);
    socket.current?.on('message-received', (newMessage) => {
      console.log('new messages is reached');
      if (selectedChat?._id === newMessage?.chat?._id) {
            setMessages([...messages, newMessage]);
          }
    })
  });

  // old
  const sendedMessage = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="bg-white rounded-md md:p-5 md:pb-20 h-full relative">
      {!selectedChat?._id ? (
        <div className="w-full h-full flex justify-center items-center">
          No selected person
        </div>
      ) : (
        <>
          <div className="overflow-y-scroll h-full scroll">
            {messages.map((message) => (
              <div ref={scrollRef} key={message._id}>
                <Chat user={currentUserId} message={message} />
              </div>
            ))}
          </div>
        </>
      )}
      {selectedChat && (
        <SendBottomBar
          chatId={selectedChat?._id}
          sendedMessage={sendedMessage}
          socket={socket}
        />
      )}
    </div>
  );
};

export default ChatBody;
