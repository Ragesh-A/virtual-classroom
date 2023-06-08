import Avatar from "../common/Avatar";

const UserBox = ({css, name='q'}) => {
  return <div className={`bg-tileColor p-1 rounded-md min-w-[5em] min-h-[5rem] flex justify-center items-center relative ${css}`}>
    <Avatar name={name} />
    <div className="absolute top-[7px] right-[9px] text-gray-700">
    {true ? <i className="ri-mic-fill"></i>
    : <i className="ri-mic-off-fill"></i>}
    </div>
    <span className="absolute bottom-2 left-3 bg-black px-3 min-w-[5rem] text-center py-1 text-white rounded-md bg-opacity-30 uppercase">ragesh</span>
  </div>
};

export default UserBox;
