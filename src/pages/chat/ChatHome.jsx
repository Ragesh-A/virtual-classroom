import { useEffect, useRef } from 'react';
import Section from '../../components/layouts/Section';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { CHAT_SOCKET_IP } from '../../constant/constant';
import ClassPersonList from '../../components/chat/ClassPersonList';
import MessagedUsersLIst from '../../components/chat/MessagedUsersList';
import Notification from '../../components/common/Notification';
import ChatRight from './ChatRight';

const ChatHome = () => {
  const [userSelected, setUserSelected] = useState(false);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [tab, setTab] = useState('messaged');
  const { user } = useSelector((store) => store.user);
  const { currentClass } = useSelector((store) => store.classes);
  const socket = useRef();

  // socket connections
  useEffect(() => {
    if (user && currentClass?.class) {
      socket.current = io(CHAT_SOCKET_IP);
      socket.current.emit('setup', user);
      socket.current.on('connection ', () => setSocketConnected(true));
      socket.current.on('disconnect', () => setSocketConnected(false));
    }
    
    return () => {
      if (socket){
        socket?.current?.off('disconnect');
        socket?.current?.disconnect();
      }
    }
  }, [currentClass?.class?._id, user]);


  return (
    <>
      <Section className="p-0 md:px-[16px] md:p-5">
        <Notification />
        <div className=" rounded h-[72vh] md:h-[80vh] relative flex gap-3">
          <div
            className={`bg-tileColor absolute z-[2] w-full p-3 md:w-[25rem] h-full border-2 border-white rounded-xl shadow md:relative overflow-hidden ${
              userSelected && 'hidden'
            } md:block`}
          >
            {tab === 'messaged' && (
              <div
                className=" absolute z-30 right-10 bg-primary flex justify-center items-center rounded-full w-10 h-10 bottom-10 cursor-pointer text-white hover:border-2"
                onClick={() => setTab('classList')}
              >
                <i className="ri-chat-smile-3-fill"></i>
              </div>
            )}
            {tab === 'messaged' ? (
              <MessagedUsersLIst
                currentPerson={user?._id}
                onlineUsers={onlineUser}
                setUserSelected={setUserSelected}
              />
            ) : (
              <ClassPersonList
                onlineUsers={onlineUser}
                myId={user?._id}
                back={() => setTab('messaged')}
              />
            )}
          </div>
          <ChatRight
            socket={socket}
            myId={user?._id}
            setUserSelected={setUserSelected}
          />
        </div>
      </Section>
    </>
  );
};

export default ChatHome;
