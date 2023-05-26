import { NavLink } from 'react-router-dom';
import CreateClass from '../common/CreateClass';
import { useState } from 'react';

const ClassroomHeaderComponent = () => {
  const [popIsVisible, setPopIsVisible] = useState(false);

  const popHandle = () => {
    setPopIsVisible(popIsVisible ? false : true);
  };

  return (
    <>
      <ul className="flex items-center">
        <NavLink
          to="/"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-people-roof sm:hidden"></i>
          <li className="hidden sm:block">My class</li>
        </NavLink>
        <li>
          <button
            className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
            onClick={popHandle}
          >
            <i className="fa-solid fa-plus sm:hidden"></i>
            <span className="hidden sm:block">Add | Join</span>
          </button>
        </li>
        <NavLink
          to="/meetup"
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-video sm:hidden"></i>
          <li className="hidden sm:block">Meet Up</li>
        </NavLink>
      </ul>
      <CreateClass visible={popIsVisible} setVisible={setPopIsVisible} />
    </>
  );
};

export default ClassroomHeaderComponent;
