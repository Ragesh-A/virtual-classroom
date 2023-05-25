/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useParams } from 'react-router-dom';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classServices from '../../services/classServices';
import { setCurrentClass } from '../../utils/store/classesSlice';
import { getToken } from '../../utils/storageHelper';

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
  console.log(currentClass?.class?._id,"current")
  return (
    <>
      <Header page="classroom" isLecture/>
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
