import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <NavLink to="/admin/" className='w-full SideBar-tab flex items-center gap-3 px-3 py-2 font-bold rounded'>
        <i className="ri-dashboard-fill text-xl mr-3"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/users" className='w-full SideBar-tab flex items-center gap-3 px-3 py-2 font-bold rounded'>
          <i className="fa-solid fa-users-line mr-3"></i>
          <span>Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/classes" className='w-full SideBar-tab flex items-center gap-3 px-3 py-2 font-bold rounded'>
        <i className="fa-solid fa-people-roof mr-3"></i>
          <span>classes</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminSidebar;
