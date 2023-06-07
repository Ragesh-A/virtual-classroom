import { useEffect, useState } from "react";
import Shimmer from "../common/Shimmer";
import chatServices from "../../services/chatServices";
import SelectUser from "./SelectUser";

const MessagedUsersLIst = ({usersList = [], currentPerson, setPerson, setConversation, onlineUsers, setUserSelected}) => {
  // const [usersList,setUsersList] = useState()
  const [filtered, setFiltered] = useState(1)
  const [users, setUsers] = useState()
  const [chats, setChats] = useState()

  const filterUsers = (search) => {
    if (usersList?.length !== 0 ){
      const filteredUser = usersList?.students?.filter(student=>student?.name.toLowerCase().includes(search.toLowerCase()))
      setFiltered(filteredUser)
    }
  }
  console.log(currentPerson, "current users");
  useEffect(()=>{
    const response = chatServices.getChats()
    response.then(res=>{
      // const filteredCurrentUser = res?.success.chats.filter(user=> user?._id !== currentPerson)
      setChats(res?.success?.chats)
      const us = res?.success?.chats?.map(e=>(
        e?.members?.find(s=>s._id !== currentPerson)
      ))
      setUsers(us)
    })
  },[currentPerson])

  const handleSelection = (chatId, index)=>{
    setConversation(chatId);
    setPerson(users[index])
    setUserSelected(true)
  }



  if (!filtered) return <Shimmer count={3}/>

  return (
    <div className="">
      <div className=" text-textColor mt-5">
        <div className="flex items-center rounded pl-5 px-2 py-1 inner-shadow border-1 border-white">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="w-full px-5 py-1 bg-transparent outline-none"
            placeholder="search name"
            onChange={(e)=>filterUsers(e.target.value)}
          />
        </div>
      </div>
      <p className="font-mono text-sm font-bold tracking-widest py-2">CHAT</p>
      <div className="flex flex-col overflow-y-scroll scroll h-full relative">
        {chats &&
          chats?.map((chat, index) => (
            <div key={chat._id} className="" onClick={()=>handleSelection(chat._id, index)}>
              <SelectUser chat={chat} key={chat?._id} />
            </div>
          ))}
        
      </div>
    </div>
  );
}

export default MessagedUsersLIst;