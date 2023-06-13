import { useEffect, useState } from "react";
import Shimmer from "../common/Shimmer";
import chatServices from "../../services/chatServices";
import SelectUser from "./SelectUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SetChats, setSelectedChat } from "../../utils/store/chatSlice";

const MessagedUsersLIst = ({usersList = [], onlineUsers}) => {
  // const [usersList,setUsersList] = useState()
  const [filtered, setFiltered] = useState(1)
  const { classId } = useParams()

  const dispatch = useDispatch()
  const { chats, selectedChat } = useSelector(store=>store.chatMate)

  const filterUsers = (search) => {
    if (usersList?.length !== 0 ){
      const filteredUser = usersList?.students?.filter(student=>student?.name.toLowerCase().includes(search.toLowerCase()))
      setFiltered(filteredUser)
    }
  }
 

  const handleSelection = (chat)=>{
    dispatch(setSelectedChat(chat))
  }

  useEffect(()=>{
    if (!chats) {
      const promise = chatServices.allChats(classId);
      promise.then(res=> {
        if (res.success) {
          dispatch(SetChats(res?.success?.chats))
        }
      })
      promise.catch(res=> console.log(res))
    }
  }, [classId])


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
          chats?.map((chat) => (
            <div key={chat._id} className={chat?._id === selectedChat?._id ? 'bg-gray-200' : ''} onClick={()=>handleSelection(chat)}>
              <SelectUser chat={chat} key={chat?._id} />
            </div>
          ))}
        
      </div>
    </div>
  );
}

export default MessagedUsersLIst;