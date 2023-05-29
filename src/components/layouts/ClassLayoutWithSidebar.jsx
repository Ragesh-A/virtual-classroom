import { Outlet, useParams } from 'react-router-dom';
import Section from './Section';
import SideBar from '../classroom/student/SideBar';
import { useEffect, useState } from 'react';
import lectureServices from '../../services/lectureServices';
import { useDispatch } from 'react-redux';
import { setAssignment } from '../../utils/store/classesSlice';

const ClassLayoutWithSidebar = ({Si=''}) => {

  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch()

  const {classId} = useParams()
  const handleToggle = () => {
    setToggle(toggle ? false : true)
  }
  useEffect(()=>{
    lectureServices.allAssignments(classId).then(res=>{
      if(res?.success){
        dispatch(setAssignment(res?.success?.assignments))
      }
    })
    return ()=>{
      dispatch(setAssignment(null))
    }
  },[])

  return (
    <Section>
      <SideBar toggle={toggle} setToggle={handleToggle} />
      
      <div className={`ml-28 transition ${toggle ? 'active' : ''} rounded sidebar-body`}>
        <Outlet />
      </div>
    </Section>
  );
};

export default ClassLayoutWithSidebar;
