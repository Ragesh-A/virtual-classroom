import { Outlet } from 'react-router-dom';
import Section from './Section';
import SideBar from '../classroom/student/SideBar';
import { useState } from 'react';

const ClassLayoutWithSidebar = () => {

  const [toggle, setToggle] = useState(true)
  const handleToggle = () => {
    setToggle(toggle ? false : true)
  }

  return (
    <Section>
      <SideBar toggle={toggle} setToggle={handleToggle} />
      
      <div className={`bg-red-500 ml-28 transition ${toggle ? 'active' : ''} rounded sidebar-body`}>
        <Outlet />
      </div>
    </Section>
  );
};

export default ClassLayoutWithSidebar;
