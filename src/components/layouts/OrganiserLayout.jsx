import { Outlet } from 'react-router';
import logo from '../../assets/images/logo-dark.png'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const OrganizerLayout = () => {

  const [currentTab, setCurrentTab] = useState('classes')


  return (
    <div className="min-h-[100vh] relative bg-gray-100">
      <div className="sidebar active shadow top-0 bg-primary left-[-250px] md:left-0  fixed h-full overflow-hidden">
       <ul className='mt-40'>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization/instructors' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold ${currentTab === 'lectures' ? 'text-primary bg-white' : 'text-white'}`} onClick={()=>setCurrentTab('lectures')}>
          <i className="fa-solid fa-chalkboard-user ps-3"></i>
            <span>Lectures</span>
          </NavLink>
        </li>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold ${currentTab === 'classes' ? 'text-primary bg-white' : 'text-white'}`} onClick={()=>setCurrentTab('classes')}>
            <i className="fa-solid fa-people-roof"></i>
            <span>Classes</span>
          </NavLink>
        </li>
       </ul>
      </div>
      <div className="fixed top-4 w-full md:px-10">
        <div className="bg-white rounded p-4 box">
        <div className="max-w-[5rem]">
          <img src={logo} alt="" />
        </div>
        </div>
      </div>


      <div className="main-content pt-28 ps-3 pe-10">
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerLayout;
