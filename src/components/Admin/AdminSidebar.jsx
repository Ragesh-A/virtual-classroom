import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IMAGE_PATH } from '../../constant/constant'
import { userLogOut } from '../../utils/store/userSlice';

const AdminSidebar = ({toggle}) => {
  const { user } = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLogOut())
    navigate('/home');
  }
  return (
    <div className="flex justify-between flex-col h-full">
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
      <div className="relative">
        <div className={`absolute hidden justify-center items-center overflow-hidden w-[80px] h-[80px] border-[4px] border-white bg-primary rounded-full left-[30%] -top-6 origin-center ${toggle && 'md:flex'}`}>
          {
            user?.avatar ? <img src={`${IMAGE_PATH}profiles/${user?.avatar}`} draggable='false' alt="avatar"/> : <p className='text-2xl text-white font-bold'>{user?.name[0]}</p>
          }
        </div>
        <div className="bg-gradient-to-b flex items-end justify-center p-3 from-lightPrimary to-primary text-white rounded-md md:h-[8rem]">
          <button className='text-center overflow-hidden flex flex-row gap-2 items-center' onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i>
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default AdminSidebar;
