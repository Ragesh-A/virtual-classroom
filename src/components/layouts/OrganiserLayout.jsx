import { Outlet } from 'react-router';
import logo from '../../assets/images/logo-dark.png'
import { Link, NavLink } from 'react-router-dom';
import Notification from '../common/Notification'

const OrganizerLayout = () => {
  
  return (
    <div className="min-h-[100vh] relative bg-gray-100">
      <div className="sidebar active shadow top-0 bg-primary left-[-250px] md:left-0  fixed h-full overflow-hidden">
       <ul className='mt-40'>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization/' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold sidebar-tab`}>
          <i className="fa-solid fa-chalkboard-user"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization/instructors/' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold sidebar-tab`}>
          <i className="fa-solid fa-chalkboard-user"></i>
            <span>Instructor</span>
          </NavLink>
        </li>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization/classes' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold sidebar-tab`}>
            <i className="fa-solid fa-people-roof"></i>
            <span>Classes</span>
          </NavLink>
        </li>
        <li className=' rounded-sideBar-tab ps-3'>
          <NavLink to='/organization/assignments/' className={`flex w-full px-5 gap-5 items-center py-3 rounded-s-md font-bold sidebar-tab`}>
          {/* <i className="fa-solid fa-bullhorn"></i> */}
          <i className="fa-solid fa-calendar-check"></i>
            <span>Assignments</span>
          </NavLink>
        </li>
       </ul>
      </div>
      <div className="fixed top-4 w-full md:px-10">
        <div className="bg-white rounded p-4 box">
        <div className="max-w-[5rem]">
          <Link to='/home'>
          <img draggable='false' src={logo} alt="" />
          </Link>
        </div>
        </div>
      </div>


      <div className="main-content pt-28 px-3 md:pe-10">
        <Notification />
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerLayout;
