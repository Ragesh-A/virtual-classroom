import { useState } from 'react';
import logo from '../../assets/images/logo-dark.png'
import AdminSidebar from '../Admin/AdminSidebar';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { decodeUser } from '../../utils/storageHelper';

const AdminLayout = () => {

  const [toggle, setToggle] = useState(true)
  const user  = decodeUser()
  if (!user || !user?.isAdmin){
    return <Navigate to='/home' />
  }

  const handleToggle = () =>{
    setToggle(toggle ? false : true)
  }

  return(
    <div className="bg-[#fefefe] md:px-5 h-screen flex flex-col">
      <div className='p-4 flex  justify-between items-center'>
        <Link to='/home'>
          <img draggable='false' src={logo} alt="logo" width='50px' />
        </Link>
      <i className="fa-solid fa-bars text-xl cursor-pointer" onClick={()=>handleToggle('doctor')} ></i>
      </div>
      <div className="bg-[#F4F7FE] inner-shadow rounded-md p-3 h-[90vh] overflow-y-scroll scroll relative">
        <div className={`fixed sidebar md:max-w-[200px] box rounded overflow-hidden p-2 h-[87vh] ${toggle ? 'active' : ''}`}>
          <AdminSidebar />
        </div>
        <div className="main-content md:ps-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default AdminLayout;