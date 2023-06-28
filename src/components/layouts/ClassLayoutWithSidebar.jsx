import { Outlet, useParams } from 'react-router-dom';
import Section from './Section';
import SideBar from '../classroom/student/SideBar';
import { useState } from 'react';
import Notification from '../common/Notification';

const ClassLayoutWithSidebar = ({Si=''}) => {

  const [toggle, setToggle] = useState(true)

  const handleToggle = () => {
    setToggle(toggle ? false : true)
  }

  return (
    <Section>
      <SideBar toggle={toggle} setToggle={handleToggle} />
      <Notification />
      <div className={`ml-28 transition ${toggle ? 'active' : ''} rounded sidebar-body`}>
        <Outlet />
      </div>
    </Section>
  );
};

export default ClassLayoutWithSidebar;
