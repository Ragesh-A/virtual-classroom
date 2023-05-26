import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-dark.png';
import ClassroomHeaderComponent from './ClassroomHeaderComponent';
import SingleClassHeaderComponent from './SingleClassHeader';

const Header = ({ page, isLecture = false }) => {
  let element = <></>;
  if (page === 'allClass') {
    element = <ClassroomHeaderComponent />;
  } else if (page === 'classroom') {
    element = <SingleClassHeaderComponent />;
  }

  return (
    <header className="flex justify-between pt-8 ps-5 md:ps-16 pb-10 rounded-bl-xl">
      <div className="max-w-[4rem] flex items-center">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r from-lightPrimary to-primary items-center justify-between overflow-hidden md:relative md:rounded-s-[2rem] ps-8 md:w-[70vw] max-w-[50rem]">
        {element}
        <div className="flex items-center my-2">
          <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase" to='/profile'>
            <i className="fa-solid fa-user sm:hidden"></i>
            <span className="hidden sm:block">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
