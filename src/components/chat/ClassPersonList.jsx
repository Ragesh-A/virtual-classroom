import { useEffect, useState } from 'react';
import Avatar from '../common/Avatar';
import { useSelector } from 'react-redux';
import Shimmer from '../common/Shimmer';
import chatServices from '../../services/chatServices';

const ClassPersonList = ({ back, onlineUsers }) => {
  const { currentClass } = useSelector(store=>store.classes)
  const [filtered, setFiltered ] = useState();

  useEffect(()=> {
    setFiltered(currentClass?.students)
  }, [ currentClass ])

  const makeConnection = async (userId) => {
    //function to create the new connection between the users
    const promise = chatServices.createConnection(currentClass?.class?._id, userId)
    promise.catch(error=>{console.log(error)})
    promise.then(res=>{
      console.log(res);
    })
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
    <div className="">
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
      <div className="flex flex-col overflow-y-scroll h-full relative">
        
        {filtered &&
          filtered?.map((user) => (
            <div
              className={`flex gap-5 items-center border-b-2 px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-md`}
              key={user._id + "chat"}
              onClick={() => makeConnection(user?._id)}
            >
              <Avatar name={`${user?.name}`} />
              <div className="">
              <p className="text-textColor font-bold font-mono capitalize">
                {user?.name}
              </p>
              {isUserOnline(user?._id) ? <p className='text-[10px] text-green-500'>online</p>: <p className='text-[10px] text-red-500'>offline</p>}
              </div>
            </div>
          ))}
        
      </div>
    </div>
  );
};

export default ClassPersonList;

