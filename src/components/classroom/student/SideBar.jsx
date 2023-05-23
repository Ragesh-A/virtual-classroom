import { useState } from "react";
import Section from "../../layouts/Section";
import './SideBar.css'

const SideBar = () => {

  const [tab, setTab] = useState('pending')
  const [isFullBar, setIsFullBar] = useState(false)

  return(
    
      <ul className={`flex flex-col fixed w-15 overflow-hidden p-2 side-bar ${isFullBar ? 'active': ''}`} >
        <li className="p-2">
          {isFullBar && <span>TASKS</span>}
          <i class="fa-solid fa-arrows-left-right-to-line float-right text-textColor" onClick={()=>setIsFullBar(isFullBar ? false: true)}></i>
        </li>
        <li className="mt-2">
          <button className={`flex justify-between items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='pending' ? 'active' : ''} SideBar-tabflex justify-between items-center `} onClick={()=>setTab('pending')}>
            <i class="fa-regular fa-hourglass-half"></i>
            {isFullBar && <span className="side-bar-title">Pending Task</span>}
            </button>
        </li>
        <li className="mt-2">
          <button className={`flex justify-between items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='completed' ? 'active' : ''} SideBar-tab flex justify-between items-center `} onClick={()=>setTab('completed')}>
          <i class="fa-solid fa-check"></i>
            {isFullBar && <span className="side-bar-title">Pending Task</span>}
            </button>
        </li>
        <li className="mt-2">
          <button className={`flex justify-between items-center py-3 px-8 rounded shadow bg-white text-textColor font-bold  w-full text-left hover:bg-indigo-500 hover:text-white ${ tab ==='missed' ? 'active' : ''} SideBar-tab`} onClick={()=>setTab('missed')}>
          <i class="fa-solid fa-xmark"></i>
            {isFullBar && <span className="side-bar-title">Pending Task</span>}
            </button>
        </li>
        
      </ul>
    
    
  )
} 

export default SideBar;