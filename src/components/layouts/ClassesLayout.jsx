/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import Header from '../classroom/header/Header';
import Notification from '../common/Notification';

const ClassesLayout = () => {
  return (
    <>
      <Header page="allClass" />
      <Notification />
      <Outlet />
    </>
  );
};

export default ClassesLayout;
