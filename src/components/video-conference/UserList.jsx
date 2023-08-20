import Avatar from '../common/Avatar';

const UserList = ({ setSettingsActive }) => {
  const users = new Array(10).fill('user');

  return (
    <>
      <div className="flex py-2 md:flex-col px-3 justify-between md:p-3 md:h-full bg-white relative">
        <div className="flex max-w-[65%] md:max-w-full gap-5 md:flex-col md:max-h-[80%]">
          <div className="overflow-scroll scroll flex flex-row gap-2 md:flex-col">
            {users.map((s, ind) => (
              <div className={`bg-tileColor p-1 rounded-md min-w-[6em] min-h-[6rem] flex justify-center items-center relative md:mt-2 $`} key={s+ind}>
              <Avatar name={s} />
              <div className="absolute top-[7px] right-[9px] text-gray-700">
              {true ? <i className="ri-mic-fill"></i>
              : <i className="ri-mic-off-fill"></i>}
              </div>
              <span className="absolute bottom-0 left-0 bg-black px-1 max-w-[3rem] text-center py-1 text-[10px] text-white rounded-e-md rounded-es-md bg-opacity-30 overflow-hidden">ragesh</span>
            </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 md:flex-col md:gap-0">
        <div className="bg-tileColor flex justify-center items-center p-1 font-semibold text-2xl">
          <i className="ri-arrow-down-double-fill hidden md:block"></i>
          <i className="ri-arrow-right-double-line md:hidden"></i>
        </div>
          <button
            onClick={()=>setSettingsActive(prev=>!prev)}
            className="bg-tileColor p-1 rounded-md min-w-[5em] min-h-[5rem] flex justify-center items-center relative md:mt-2">
          <i className="ri-settings-3-fill text-3xl text-blue-950"></i>
        </button>
        </div>
      </div>
    </>
  );
};
export default UserList;
