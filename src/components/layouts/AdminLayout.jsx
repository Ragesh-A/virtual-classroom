import { useState } from 'react';
import logo from '../../assets/images/logo-dark.png'
import AdminSidebar from '../Admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

  const [toggle, setToggle] = useState(true)

  const handleToggle = () =>{
    setToggle(toggle ? false : true)
  }

  return(
    <div className="bg-[#fefefe] px-5 min-h-screen flex flex-col">
      <div className='p-4 flex  justify-between items-center'>
      <img src={logo} alt="logo" width='50px' />
      <i className="fa-solid fa-bars text-xl cursor-pointer" onClick={()=>handleToggle()}></i>
      </div>
      <div className="bg-[#F4F7FE] inner-shadow rounded-md p-3 h-[90vh] overflow-y-scroll relative">
        <div className={`box sidebar rounded overflow-hidden p-2 fixed h-[87vh] ${toggle ? 'active' : ''}`}>
          <AdminSidebar />
        </div>
        <div className="main-content ps-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default AdminLayout;