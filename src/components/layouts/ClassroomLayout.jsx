/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const ClassroomLayout = () => {
  return (
    <>
      <Header page="classroom" />
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
