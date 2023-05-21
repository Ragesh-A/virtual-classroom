/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ClassroomHeader from '../classroom/student/ClassroomHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import authServices from '../../services/authService';

const ClassroomLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authServices.checkToken().then(token=>{
      if (!token) {
        navigate('/auth/login');
      }
    })
  }, []);

  return (
    <>
      <ClassroomHeader />
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
