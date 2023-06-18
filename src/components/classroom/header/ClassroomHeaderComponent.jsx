import { NavLink } from 'react-router-dom';
import CreateClass from '../common/CreateClass';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ClassroomHeaderComponent = () => {
  const [popIsVisible, setPopIsVisible] = useState(false);
  const {user} = useSelector(store=>store.user)

  const popHandle = () => {
    setPopIsVisible(popIsVisible ? false : true);
  };

  return (
    <>
      <ul className="flex items-center justify-evenly lg:justify-start w-full">
        <NavLink
          to="/"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-home-2-fill lg:hidden"></i>
          <li className="hidden lg:block">My class</li>
        </NavLink>
        <li>
          <button
            className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
            onClick={popHandle}
          >
            <i className="ri-add-fill lg:hidden"></i>
            <span className="hidden lg:block">Add | Join</span>
          </button>
        </li>
        {user?.subscriber?.status && <NavLink
          to="/organization/"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-building-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Organization</li>
        </NavLink>}
        {user?.subscriber?.status && <NavLink
          to="/admin/"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-dashboard-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Dashboard</li>
        </NavLink>}
        <NavLink
          to="/meetup"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-vidicon-fill lg:hidden"></i>
          <li className="hidden lg:block">Meet Up</li>
        </NavLink>
      </ul>
      <CreateClass visible={popIsVisible} setVisible={setPopIsVisible} />
    </>
  );
};

export default ClassroomHeaderComponent;
