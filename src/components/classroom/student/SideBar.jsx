import './SideBar.css'
import { NavLink, useParams } from "react-router-dom";

const SideBar = ({ toggle, setToggle}) => {

  const { classId } = useParams()

  return(
    
    <ul className={`flex flex-col fixed z-[3] overflow-hidden p-2 h-[75vh] rounded-md side-bar bg-tileColor ${toggle ? 'active': ''} border-2`} >
        <li className="p-2 flex justify-between w-full items-center h-[2rem] transitions font-bold text-textColor">
          {toggle && <span>TASKS</span>}
        <i className="fa-solid fa-arrows-left-right-to-line float-right text-textColor cursor-pointer'" onClick={()=>setToggle(toggle ? false : true)}></i>
      </li>
      <NavLink to={`/class/${classId}/works/`} className="mt-2 SideBar-tab">
          <button className={`flex gap-5 items-center py-3 px-4 md:px-8 rounded shadow font-bold  w-full text-left hover:bg-indigo-500 hover:text-white h-[3rem]`} >
            <i className="fa-regular fa-hourglass-half"></i>
          {toggle && <span className="side-bar-title">Pending Task</span>}
          </button>
      </NavLink>
      <NavLink to={`/class/${classId}/works/completed`} className="mt-2 SideBar-tab">
          <button className={`flex gap-5 py-3 px-4 md:px-8 rounded shadow w-full text-left hover:bg-indigo-500 hover:text-white font-bold  items-center `} >
          <i className="fa-solid fa-check"></i>
          {toggle && <span className="side-bar-title">Completed Task</span>}
          </button>
      </NavLink>
      <NavLink to={`/class/${classId}/works/missed`} className="mt-2 SideBar-tab">
          <button className={`flex gap-5 items-center py-3 px-4 md:px-8 rounded shadow font-bold  w-full text-left hover:bg-indigo-500 hover:text-white`} >
          <i className="fa-solid fa-xmark"></i>
          {toggle && <span className="side-bar-title">Missed Task</span>}
          </button>
      </NavLink>
      <NavLink to={`/class/${classId}/works/quizzes-and-exams`} className="mt-2 SideBar-tab">
          <button className={`flex gap-5 items-center py-3 px-4 md:px-8 rounded shadow font-bold  w-full text-left hover:bg-indigo-500 hover:text-white`} >
          <i className="fa-solid fa-xmark"></i>
          {toggle && <span className="side-bar-title">Quizzes</span>}
          </button>
      </NavLink>
      
    </ul> 
  )
} 

export default SideBar;