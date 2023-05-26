/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import Header from '../classroom/header/Header';

const ClassesLayout = () => {
  return (
    <>
      <Header page="allClass" />
      <Outlet />
    </>
  );
};

export default ClassesLayout;
