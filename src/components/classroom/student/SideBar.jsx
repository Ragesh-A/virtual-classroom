import { useState } from "react";
import Section from "../../layouts/Section";
import './SideBar.css'

const SideBar = () => {

  const [tab, setTab] = useState('pending')
  const [isFullBar, setIsFullBar] = useState(false)

  return(
    
      <ul className={`flex flex-col fixed w-15 overflow-hidden p-2 h-[75vh] rounded-md side-bar ${isFullBar ? 'active': ''}`} >
        <li className="p-2 flex justify-between w-full items-center h-[2rem] transitions font-bold text-textColor">
          {isFullBar && <span>TASKS</span>}
          <i className="fa-solid fa-arrows-left-right-to-line float-right text-textColor" onClick={()=>setIsFullBar(isFullBar ? false: true)}></i>
        </li>
        <li className="mt-2">
          <button className={`flex gap-5 items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='pending' ? 'active' : ''} SideBar-tab items-center h-[3rem]`} onClick={()=>setTab('pending')}>
            <i className="fa-regular fa-hourglass-half"></i>
            {isFullBar && <span className="side-bar-title">Pending Task</span>}
            </button>
        </li>
        <li className="mt-2">
          <button className={`flex gap-5 items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='completed' ? 'active' : ''} SideBar-tab items-center `} onClick={()=>setTab('completed')}>
          <i className="fa-solid fa-check"></i>
            {isFullBar && <span className="side-bar-title">Completed Task</span>}
            </button>
        </li>
        <li className="mt-2">
          <button className={`flex gap-5 items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='missed' ? 'active' : ''} SideBar-tab  items-center `} onClick={()=>setTab('missed')}>
          <i className="fa-solid fa-xmark"></i>
            {isFullBar && <span className="side-bar-title">Missed Task</span>}
            </button>
        </li>
        
      </ul>
    
    
  )
} 

export default SideBar;