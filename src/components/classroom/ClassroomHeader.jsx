import { Link, NavLink } from 'react-router-dom';
import Header from '../common/Header';
import CreateClass from './CreateClass';
import { useState } from 'react';

const ClassroomHeader = () => {
  const [popIsVisible, setPopIsVisible] = useState(false);

  const popHandle = () => {
    setPopIsVisible(popIsVisible ? false : true)
  }
  return (
    <>
      <Header>
        <div className="flex absolute bottom-0 left-0 w-full z-50 bg-gradient-to-r from-lightPrimary to-primary items-center justify-between overflow-hidden md:relative md:rounded-s-[2rem] ps-8 md:w-[70vw] max-w-[50rem] ">
          <ul className="flex items-center">
            <NavLink to="/" className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav">
              <i className="fa-solid fa-people-roof sm:hidden"></i>
              <li className="hidden sm:block">My class</li>
            </NavLink>
            <li>
              <button className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav" onClick={popHandle}>
                <i className="fa-solid fa-plus sm:hidden"></i>
                <span className="hidden sm:block">Add | Join</span>
              </button>
            </li>
            <NavLink to="/meetup" className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav">
              <i className="fa-solid fa-video sm:hidden"></i>
              <li className="hidden sm:block">Meet Up</li>
            </NavLink>
          </ul>
          <div className="flex items-center my-2">
            <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase">
              <i className="fa-solid fa-user sm:hidden"></i>
              <span className="hidden sm:block">Profile</span>
            </Link>
          </div>
        </div>
      </Header>
      <CreateClass visible={popIsVisible} setVisible={setPopIsVisible} />
    </>
  );
};

export default ClassroomHeader;
