import { useEffect, useRef } from 'react';
import Section from '../../components/layouts/Section';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { CHAT_SOCKET_IP } from '../../constant/constant';
import ClassPersonList from '../../components/chat/ClassPersonList';
import MessagedUsersLIst from '../../components/chat/MessagedUsersList';
import Notification from '../../components/common/Notification';
import ChatRight from './ChatRight';
import { setSelectedChat } from '../../utils/store/chatSlice';

const ChatHome = () => {
  const [userSelected, setUserSelected] = useState(false);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [tab, setTab] = useState('messaged');
  const { user } = useSelector((store) => store.user);
  const { currentClass } = useSelector((store) => store.classes);
  const socket = useRef();
  const dispatch = useDispatch()

  // socket connections
  useEffect(() => {
    if (user && currentClass?.class) {
      socket.current = io(CHAT_SOCKET_IP);
      socket.current.emit('setup', {...user, classId: currentClass?.class?._id});
      socket.current.on('online-users', (online) => {
        const classOnlineUser = online.filter(onlineSingleUser => {
          return onlineSingleUser.class === currentClass?.class?._id
        })
        setOnlineUsers(classOnlineUser)
      })
    }
    
    return () => {
      if (socket){
        socket?.current?.off('disconnect', {user: user?._id});
        socket?.current?.disconnect();
      }
      dispatch(setSelectedChat(null))
    }
  }, [currentClass?.class, currentClass?.class?._id, dispatch, user]);


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
            onlineUsers={onlineUser}
            myId={user?._id}
            setUserSelected={setUserSelected}
          />
        </div>
      </Section>
    </>
  );
};

export default ChatHome;
