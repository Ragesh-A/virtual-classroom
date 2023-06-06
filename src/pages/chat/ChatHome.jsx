import { useEffect, useRef } from 'react';
import Section from '../../components/layouts/Section';
import { useState } from 'react';
import Avatar from '../../components/common/Avatar';
import { useSelector } from 'react-redux';
import chatServices from '../../services/chatServices';
import ChatBody from './ChatBody';
import { io } from 'socket.io-client';
import { SOCKET_IP } from '../../constant/constant';
import ClassPersonList from '../../components/chat/ClassPersonList';
import MessagedUsersLIst from '../../components/chat/MessagedUsersList';
import bg from '../../assets/images/chat-mate.png'

const ChatHome = () => {
  const [chats, setChats] = useState([]);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [tab, setTab] = useState('messaged');
  const { user } = useSelector((store) => store.user);
  const { currentClass } = useSelector((store) => store.classes);
  const [selectedPerson, setSelectedPerson] = useState();
  const [conversation, setConversation] = useState();
  const socket = useRef();
  const [message, setMessage] = useState([]);
  const mes = useRef();

  // socket connections
  useEffect(() => {
    if (user && currentClass?.class) {
      socket.current = io(SOCKET_IP);
      socket.current.emit('new-user-add', {user:user?._id, class: currentClass?.class?._id});
      socket.current.on('get-users', (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user, currentClass]);

  // get the data from the server
  useEffect(() => {
    const getChats = async () => {
      const res = await chatServices.getChats();
      if (res?.success) {
        // to whom he has chats
        setChats(res?.success?.chats);
      }
    };
    getChats();
  }, []);

  console.log(user?._id, 'me');
    // create an function to send the data into the server

    // send the message to socket sever
  

  return (
    <>
      <Section>
        <div className=" rounded md:h-[80vh] relative flex gap-3">
          <div className="bg-tileColor p-3 md:w-[25rem] h-full border-2 border-white rounded-xl shadow relative overflow-hidden">
            {tab === 'messaged' && (
              <div
                className=" absolute right-10 bg-primary flex justify-center items-center rounded-full w-10 h-10 bottom-10 cursor-pointer text-white hover:border-2"
                onClick={() => setTab('classList')}
              >
                <i className="ri-chat-smile-3-fill"></i>
              </div>
            )}
            {tab === 'messaged' ? (
              <MessagedUsersLIst
                usersList={[]}
                setConversation={setConversation}
                setPerson={setSelectedPerson}
                currentPerson={user?._id}
                onlineUsers={onlineUser}
              />
            ) : (
              <ClassPersonList onlineUsers={onlineUser} back={() => setTab('messaged')} />
            )}
          </div>

          {
            <div className="bg-tileColor md:w-[calc(100%-25rem)] border-2 border-white rounded-xl shadow p-4 relative">
              {selectedPerson ? (
                <>
                  <div className="pb-2 flex gap-3 items-center">
                    <Avatar name={selectedPerson?.name} />
                    <div className="">
                      <p className="uppercase">
                        {conversation && selectedPerson.name}
                      </p>
                      <p className={`text-[10px] text-green-500`}>online</p>
                    </div>
                  </div>
                  <div className="rounded h-[92%] relative">
                    <ChatBody
                      chat={''}
                      classId={currentClass?.class?._id}
                      friend={selectedPerson}
                      conversationId={conversation}
                      currentUserId={user?._id}
                      socket={socket}
                    />
                  </div>
                </>
              ) : (
                <div className="flex gap-2 h-full flex-col justify-center items-center">
                  <h2 className='text-primary font-bold text-4xl uppercase'>Chat mate</h2>
                  <img src={bg} alt='chat-mate' />
                  <p className='text-gray-400 font-bold'>select a person to person to communicate</p>
                </div>
              )}
            </div>
          }
        </div>
      </Section>
    </>
  );
};

export default ChatHome;
