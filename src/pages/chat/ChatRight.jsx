import { useSelector } from 'react-redux';
import Avatar from '../../components/common/Avatar';
import ChatBody from './ChatBody';
import bg from '../../assets/images/chat-mate.png';
import { useEffect, useState } from 'react';

const ChatRight = ({ setUserSelected, socket, myId, onlineUsers }) => {
  const { selectedChat } = useSelector((store) => store.chatMate);
  const [isHeOnline, setIsHeOnline] = useState(false);
  const [chatName, setChatName] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (selectedChat?.isGroup) {
      setChatName(selectedChat.chatName);
    } else {
      const friend = selectedChat?.users.find((x) => x?._id !== myId);
      setChatName(friend?.name);
    }
  }, [myId, selectedChat]);

  useEffect(() => {
    socket.current?.on('typing', () => {
      setIsTyping(true);
    });
    socket.current?.on('stop-typing', () => {
      setIsTyping(false);
    });
  }, [socket]);

  useEffect(() => {
    if (!selectedChat?.isGroup) {
      const friend = selectedChat?.users.find((x) => x?._id !== myId);
      for (let i = 0; i < onlineUsers?.length; i++) {
        if (onlineUsers[i].user === friend?._id) {
          setIsHeOnline(true);
        }
      }
    }
    return () => {
      setIsHeOnline(false);
    };
  }, [myId, onlineUsers, selectedChat]);

  return (
    <>
      <div className="bg-tileColor w-full md:w-[calc(100%-25rem)] border-2 border-white rounded-xl shadow py-2 px-1 md:p-4 relative">
        {selectedChat ? (
          <>
            <div className="pb-2 flex gap-3 items-center">
              <i
                className="ri-arrow-left-s-line p-1 cursor-pointer"
                onClick={() => setUserSelected(false)}
              ></i>
              <Avatar name={chatName} />
              <div className="">
                <p className="uppercase">{chatName}</p>
                {isHeOnline ? (
                  <p className={`text-[10px] text-green-500`}>online</p>
                ) : (
                  <p className={`text-[10px] text-red-500`}>offline</p>
                )}
                {isTyping && (
                  <p className={`text-[10px] text-green-500`}>typing</p>
                )}
              </div>
            </div>
            <div className="rounded h-[92%] relative">
              <ChatBody chat={''} socket={socket} />
            </div>
          </>
        ) : (
          <div className="flex gap-2 h-full flex-col justify-center items-center">
            <h2 className="text-primary font-bold text-4xl uppercase">
              Chat mate
            </h2>
            <img draggable="false" src={bg} alt="chat-mate" />
            <p className="text-gray-400 font-bold">
              select a person to communicate
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRight;
