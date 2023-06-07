import { NavLink } from 'react-router-dom';
import CreateClass from '../common/CreateClass';
import { useState } from 'react';
import { decodeUser } from '../../../utils/storageHelper';

const ClassroomHeaderComponent = () => {
  const [popIsVisible, setPopIsVisible] = useState(false);
  const user = decodeUser();
  console.log(user)

  const popHandle = () => {
    setPopIsVisible(popIsVisible ? false : true);
  };

  return (
    <>
      <ul className="flex items-center justify-evenly md:justify-start w-full">
        <NavLink
          to="/"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-home-2-fill md:hidden"></i>
          <li className="hidden md:block">My class</li>
        </NavLink>
        <li>
          <button
            className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
            onClick={popHandle}
          >
            <i className="ri-add-fill md:hidden"></i>
            <span className="hidden md:block">Add | Join</span>
          </button>
        </li>
        <NavLink
          to="/meetup"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-vidicon-fill md:hidden"></i>
          <li className="hidden md:block">Meet Up</li>
        </NavLink>
      </ul>
      <CreateClass visible={popIsVisible} setVisible={setPopIsVisible} />
    </>
  );
};

export default ClassroomHeaderComponent;
