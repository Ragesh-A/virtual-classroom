import { useEffect, useState } from 'react';
import Avatar from '../common/Avatar';
import { useSelector } from 'react-redux';

const SelectUser = ({ chat }) => {
  const { user } = useSelector((store) => store.user);
  const [friend, setUser] = useState();

  useEffect(() => {
    if (!chat.isGroup) {
      const singleUser = chat?.users?.find((s) => s?._id !== user?._id);
      setUser(singleUser);
    }else{
      setUser({name: chat.chatName, _id: chat._id})
    }
  }, []);

  return (
    <>
      {friend && (
        <div
          className={`flex gap-5 items-center border-b-2 px-2 py-2 cursor-pointer  hover:bg-slate-100 rounded-md`}
          key={friend._id + 'chat'}
        >
          <Avatar name={`${friend.name}`} image={friend?.avatar} />

          <p className="text-textColor font-bold font-mono capitalize">
            {friend?.name}
          </p>
        </div>
      )}
    </>
  );
};

export default SelectUser;
