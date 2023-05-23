/* eslint-disable react-hooks/exhaustive-deps */
import ClassroomHeader from '../classroom/headers/ClassroomHeader';
import { Outlet } from 'react-router-dom';

const ClassroomLayout = () => {
  return (
    <>
      <ClassroomHeader />
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
