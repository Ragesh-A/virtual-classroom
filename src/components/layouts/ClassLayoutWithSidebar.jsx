import { Outlet, useNavigate } from 'react-router-dom';
import Section from './Section';
import SideBar from '../classroom/student/SideBar';
import { useEffect, useState } from 'react';
import Notification from '../common/Notification';
import Shimmer from '../common/Shimmer';
import { useSelector } from 'react-redux';

const ClassLayoutWithSidebar = () => {

  const [toggle, setToggle] = useState(true);
  const [isLecture, setIsLecture] = useState();
  const { currentClass } = useSelector((store) => store.classes);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle(toggle ? false : true)
  }


  useEffect(() => {
    if (currentClass?.class?.instructor?._id !== user?._id) {
      setIsLecture(false)
    }else if (currentClass?.class?.instructor?._id === user?._id){
      navigate(-1);
      setIsLecture(true)
    }
  }, [currentClass, navigate, user]);

  if (!isLecture === undefined) return <Shimmer count={3}/>

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
