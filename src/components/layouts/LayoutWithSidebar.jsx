import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Section from './Section';
import { useEffect, useState } from 'react';
import Notification from '../common/Notification';
import { useSelector } from 'react-redux';
import Shimmer from '../common/Shimmer';

const LayoutWithSidebar = () => {
  const { classId } = useParams();
  const [toggle, setToggle] = useState(true);
  const { currentClass } = useSelector((store) => store.classes);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isLecture, setIsLecture] = useState(false);

  useEffect(() => {
    if (currentClass?.class?.instructor?._id !== user?._id) {
      navigate(-1);
    }else if (currentClass?.class?.instructor?._id === user?._id){
      setIsLecture(true)
    }
  }, [currentClass, navigate, user]);

  if (!isLecture) return <Shimmer />;

  return (
    <Section className="h-[80vh]">
      <ul
        className={`flex flex-col gap-2 fixed z-[2] overflow-hidden p-2 h-[75vh] rounded-md border-2 border-white bg-tileColor shadow-inner lecture-sidebar ${
          toggle ? 'active' : ''
        }`}
      >
        <li
          className="p-2 flex justify-between w-full items-center h-[2rem] transitions font-bold text-textColor"
          onClick={() => setToggle(toggle ? false : true)}
        >
          {toggle && <span>TASKS</span>}
          <i className="fa-solid fa-arrows-left-right-to-line float-right text-textColor cursor-pointer self-end"></i>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/`}
          >
            <i className="fa-solid fa-house-chimney"></i>
            {toggle && <span className="side-bar-title">Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/students`}
          >
            <i className="fa-solid fa-users-line"></i>
            {toggle && <span className="side-bar-title">Students</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/assignments`}
          >
            <i className="fa-solid fa-list-check"></i>
            {toggle && <span className="side-bar-title">Assignments</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/attendance`}
          >
            <i className="fa-solid fa-table-cells"></i>
            {toggle && <span className="side-bar-title">Attendance</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/announcements`}
          >
            <i className="fa-solid fa-bullhorn"></i>
            {toggle && <span className="side-bar-title">Announcement</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/quizzes-and-exams`}
          >
            <i className="fa-solid fa-spell-check"></i>
            {toggle && <span className="side-bar-title">Quizzes</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex gap-5 items-center py-3 px-3 md:px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white  SideBar-tab h-[3rem]`}
            to={`/class/${classId}/dashboard/settings`}
          >
            <i className="fa-solid fa-gear"></i>
            {toggle && <span className="side-bar-title">Settings</span>}
          </NavLink>
        </li>
      </ul>
      <div
        className={`transition ${
          toggle ? 'active' : ''
        } rounded sidebar-body h-full overflow-y-scroll scroll relative`}
      >
        <Notification />
        <Outlet />
      </div>
    </Section>
  );
};

export default LayoutWithSidebar;
