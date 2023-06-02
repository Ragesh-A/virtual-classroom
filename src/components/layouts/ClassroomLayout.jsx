/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useParams } from 'react-router-dom';
import Header from '../classroom/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classServices from '../../services/classServices';
import { setCurrentClass } from '../../utils/store/classesSlice';
import { getToken } from '../../utils/storageHelper';
import StudentListSlider from '../classroom/student/StudentsListSlider';

const ClassroomLayout = () => {
  const {classId} = useParams();
  const { currentClass } = useSelector(store=>store.classes);
  const [isLecture, setIsLecture] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!currentClass || currentClass?.class?._id !== classId){
      classServices.getClass(classId).then((res)=>{
        if (res?.success){
          dispatch(setCurrentClass(res?.success?.class))
          const token = getToken()
          if (res?.success?.class?.class?.instructor === token){
            setIsLecture(true);
          }
        }
      })
    }

    return ()=>{
      setIsLecture(false);
    }
  }, [])
  return (
    <>
      <Header page="classroom" isLecture={isLecture}/>
      <StudentListSlider />
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
