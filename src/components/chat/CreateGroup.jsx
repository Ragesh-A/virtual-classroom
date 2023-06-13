import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../common/Avatar";
import { setNotification } from "../../utils/store/uiSlice";
import chatServices from '../../services/chatServices'
import { useParams } from "react-router-dom";
import { addChats } from "../../utils/store/chatSlice";

const CreateGroup = ({ back }) => {
  const [chatName, setChatName] = useState("");
  const { currentClass } = useSelector((store) => store.classes);
  const [filteredUser, setFilteredUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch()
  const { classId } = useParams()

  useEffect(() => {
    setFilteredUser(currentClass?.students || []);
  }, [currentClass]);

  const filterUsers = (search) => {
    const filteredUser = currentClass?.students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUser(filteredUser);
  };

  const addIntoGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) return;
    setSelectedUsers((prev) => [...prev, userToAdd]);
  };

  const removeFromGroup = (id) => {
    setSelectedUsers((prev) => prev.filter((x) => x._id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gpName = chatName.trim()
    if (selectedUsers.length < 2) {
      dispatch(setNotification({ success: false, message: 'At least 2 or more member required'}));
      return;
    }
    if (!gpName) {
      dispatch(setNotification({ success: false, message: 'Group name is required'}))
      return;
    }
    const users = selectedUsers.map(x=>x._id)
    chatServices.createGroupChat(classId, {chatName, users}).then(res=>{
      dispatch(addChats(res.success.group));
      back()
    })
  };

  return (
    <form className="w-full bg-tileColor  h-[75vh]" onSubmit={handleSubmit}>
      <div
        className="cursor-pointer hover:bg-gray-200 flex w-8 h-8 items-center justify-center rounded-full mb-1"
        onClick={back}
      >
        <i className="ri-arrow-left-line"></i>
      </div>
      <label htmlFor="chatName">Enter group name</label>
      <div className="flex items-center rounded pl-5 px-2 py-1 inner-shadow border-1 border-white mb-2">
        <input
          type="text"
          className="w-full px-5 py-1 bg-transparent outline-none"
          name="chatName"
          placeholder="enter group name"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
      </div>
      <div className="flex items-center rounded pl-5 px-2 py-1 inner-shadow border-1 border-white">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="w-full px-5 py-1 bg-transparent outline-none"
          placeholder="search name"
          onChange={(e) => filterUsers(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap my-2 gap-2">
        {selectedUsers?.map((x) => (
          <div
            className="flex items-center bg-primary rounded px-2 py-1 text-white"
            key={x._id}
          >
            <span>{x.name}</span>
            <i
              className="ri-close-fill"
              onClick={() => removeFromGroup(x._id)}
            ></i>
          </div>
        ))}
      </div>
      <div className="flex flex-col overflow-y-scroll scroll h-full relative">
        {filteredUser &&
          filteredUser.map((user) => (
            <div
              className={`flex gap-5 items-center border-b-2 px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-md`}
              key={user._id + "chat"}
              onClick={() => addIntoGroup(user)}
            >
              <Avatar name={`${user.name}`} />
              <div className="">
                <p className="text-textColor font-bold font-mono capitalize">
                  {user.name}
                </p>
              </div>
            </div>
          ))}
      <button className="w-full bg-gray-400 border-white text-white  rounded py-2 hover:bg-gray-500">
        Create
      </button>
      </div>
    </form>
  );
};

export default CreateGroup;
