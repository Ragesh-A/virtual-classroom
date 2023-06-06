import Avatar from '../../components/common/Avatar';
import Shimmer from '../../components/common/Shimmer'
import { useEffect, useState } from 'react';

const ChatUserList = ({ data, currentUserId, setPerson, userList }) => {
  const [friendsData, setFriendsData] = useState(userList);
  useEffect(()=>{
    setFriendsData([
      {name: "munawar"},
      {name: "Abin"},
      {name: "shilibuleen"},
      {name: "Thseneem"},
      {name: "Junaid"},
      {name: "binshad"},
      {name: "jasir"},
      {name: "sufiyan"},
      {name: "hari"},
    ])
    return ()=>{
    setFriendsData(null)
    }  
  }, [userList])
 
  // if (!userList) return <Shimmer count={3}/>

  return (
    friendsData &&
    friendsData?.map((user) => (
      <div className={`flex gap-5 items-center border-b-2 px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-md`} key={user} onClick={()=>setPerson(user?.name)}>
        <Avatar name={`${user?.name}`} />
        <p className="text-textColor font-bold font-mono capitalize">{user?.name}</p>
      </div>
    ))
  );
};

export default ChatUserList;
