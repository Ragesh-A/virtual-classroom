import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <ul className="">
      <li>
        <NavLink to="/admin" className='w-full SideBar-tab flex items-center gap-3 px-3 py-2 font-bold rounded'>
          <i className="fa-solid fa-users-line"></i>
          <span>Users</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminSidebar;
