import { useEffect, useState } from 'react';
import Avatar from '../common/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Shimmer from '../common/Shimmer';
import chatServices from '../../services/chatServices';
import { useParams } from 'react-router-dom';
import { addChats, setSelectedChat } from '../../utils/store/chatSlice';
import CreateGroup from './CreateGroup';

const ClassPersonList = ({ back, onlineUsers, myId }) => {
  const { currentClass } = useSelector(store=>store.classes)
  const [filtered, setFiltered ] = useState();
  const [activeForm, setActiveForm ] = useState(false);
  const { classId } = useParams();
  const dispatch = useDispatch()
console.log(activeForm);
  useEffect(()=> {
    if (myId){
      const addLecture = [...currentClass?.students, currentClass.class.instructor]
       const filter = addLecture.filter(x => {
        console.log(x, myId);
        return x._id !== myId
      })
    console.log(filter, 'removed me');
    setFiltered(filter)
    }
    
  }, [currentClass, myId])


  // new chat data with new chat model
  const v2MakeConnection = async (userId) => {
    const promise = chatServices.accessChat(classId, userId)
    promise.then(res=> {
      dispatch(addChats(res?.success))
      dispatch(setSelectedChat(res.success))
      back()
    })
    promise.catch(error => console.log(error, "error"))
  } 

  const filterUsers = (search) => {
    const filteredUser = currentClass?.students.filter(student=>student.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(filteredUser)
  }

  const isUserOnline =  (userId) => {
    return onlineUsers.some(online=> online.userId === userId)
  }



  if (!filtered) return <Shimmer count={3}/>

  return (
    <div className="relative">
      <div className="flex gap-3">
        <div className="cursor-pointer" onClick={back}>
          <i className="ri-arrow-left-line"></i>
        </div>
        <p>Select Contact</p>
      </div>
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
      <p className="font-mono text-sm font-bold tracking-widest py-2 my-1">Members in the class</p>
      <button className="text-sm font-bold bg-gray-400 text-white p-2 rounded w-full" onClick={()=> setActiveForm((prev)=> prev ? false : true)}>
      <i className="fa-solid fa-users-rectangle mr-3"></i>
      <span>New Group</span>
      </button>
      <div className="flex flex-col overflow-y-scroll scroll h-full relative">
        
        {filtered &&
          filtered?.map((user) => (
            <div
              className={`flex gap-5 items-center border-b-2 px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-md`}
              key={user._id + "chat"}
              onClick={() => v2MakeConnection(user?._id)}
            >
              <Avatar name={`${user?.name}`} />
              <div className="">
              <p className="text-textColor font-bold font-mono capitalize">
                {user?.name}
              </p>
              {/* {isUserOnline(user?._id) ? <p className='text-[10px] text-green-500'>online</p>: <p className='text-[10px] text-red-500'>offline</p>} */}
              </div>
            </div>
          ))}
        
      </div>
      {activeForm && <div className='absolute top-0 left-0 w-full h-full z-[5]'>
            <CreateGroup back={back}/>
        </div>}
    </div>
  );
};

export default ClassPersonList;

