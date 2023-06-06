import { useEffect, useRef } from 'react';
import Section from '../../components/layouts/Section';
import { useState } from 'react';
import Avatar from '../../components/common/Avatar';
import { useSelector } from 'react-redux';
import chatServices from '../../services/chatServices';
import ChatUserList from './ChatUserList';
import ChatBody from './ChatBody';
import { io } from 'socket.io-client';
import { SOCKET_IP } from '../../constant/constant';

const ChatHome = () => {
  const [chats, setChats] = useState([]);
  const [onlineUser, setOnlineUsers] = useState([]);
  const { user } = useSelector((store) => store.user);
  const [selectedPerson, setSelectedPerson] = useState();
  const socket = useRef();
  const [message, setMessage] = useState([]);
  const mes = useRef();

  // socket connections
  useEffect(() => {
    if (user) {
      socket.current = io(SOCKET_IP);
      socket.current.emit('new-user-add', user?._id);
      socket.current.on('get-users', (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user]);

  // get the data from the server
  useEffect(() => {
    const getChats = async () => {
      const res = await chatServices.getChats();
      if (res?.success) {
        // to whom he has chats
        setChats(res?.success?.chats);
        console.log(res.success);
      }
    };
    getChats();
  }, []);

  // sending message ro friend
  function sendMessage(e) {
    e.preventDefault();
    let text = mes.current.value.trim();
    if (text) {
      setMessage([...message, text]);
      text = {
        senderId: user._id,
        message: text,
        chatId: '', // needed an chat is where they are chatting
      };
    }
    // create an function to send the data into the server

    // send the message to socket sever
  }

  console.log(chats);
  return (
    <>
      <Section>
        <div className=" rounded md:h-[80vh] relative flex gap-3">

          <div className="bg-tileColor p-3 md:w-[25rem] h-full border-2 border-white rounded-xl shadow relative overflow-hidden">
            <div className=" text-textColor mt-5">
              <div className="flex items-center rounded pl-5 px-2 py-1 inner-shadow border-1 border-white">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  className="w-full px-5 py-1 bg-transparent outline-none"
                  placeholder="search name"
                />
              </div>
            </div>
            <p className="font-mono text-sm font-bold tracking-widest py-2">
              CHAT
            </p>
            <div className="flex flex-col overflow-y-scroll h-full relative">
              <ChatUserList data={chats} userList={false} setPerson={setSelectedPerson} currentUserId={user && user._id} />
              <div className="absolute bg-green-500 p-2 text-white">
                <i className="ri-add-line"></i>
              </div>
            </div>
          </div>

          <div className="bg-tileColor md:w-[calc(100%-25rem)] border-2 border-white rounded-xl shadow p-4 relative">
            <div className="pb-2 flex gap-3 items-center">
              <Avatar name={selectedPerson} />
              <div className="">
              <p className='uppercase'>{selectedPerson && selectedPerson}</p>
              <p className={`text-[10px] text-green-500`}>online</p>
              </div>
            </div>
            <div className="rounded h-[92%] relative">
             <ChatBody chat={''} friend={selectedPerson} currentUserId={user?._id} />
            </div>
          </div>
        </div>

      </Section>
    </>
  );
};

export default ChatHome;
