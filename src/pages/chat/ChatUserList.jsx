import Avatar from '../../components/common/Avatar';
import Shimmer from '../../components/common/Shimmer'
import { useEffect, useState } from 'react';

const ChatUserList = ({ data, currentUserId, setPerson, userList  }) => {
  const [friendData, setFriendData] = useState(null);
  useEffect(() => {
    const friend = data.find((user) => user._id !== currentUserId);
    setFriendData(friend)
    const getUserData = async () => {
      const response = await 'gh';
      console.log(response);
    };
  }, []);

  if (!userList) return <Shimmer />

  return (
    <>
    {
      userList 
    }
    </>
  );
};

export default ChatUserList;
