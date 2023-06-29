import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-dark.png';
import ClassroomHeaderComponent from './ClassroomHeaderComponent';
import SingleClassHeaderComponent from './SingleClassHeader';
import { getToken } from '../../../utils/storageHelper';
import { useEffect, useState } from 'react';
import HomeHeader from './HomeHeader';

const Header = ({ page, isLecture = false }) => {
  const [logged, setLogged] = useState(false)
  useEffect(()=>{
    if (getToken()){
      setLogged(true)
    }
  }, [])

 
  let element = <></>;
  if (page === 'home'){
    element = <HomeHeader />
  } else if (page === 'allClass') {
    element = <ClassroomHeaderComponent />;
  } else if (page === 'classroom') {
    element = <SingleClassHeaderComponent />;
  }

  return (
    <header className="flex justify-between pt-8 md:ps-16 pb-2 rounded-bl-xl">
      <div className="max-w-[4rem] flex items-center ms-4 md:ms-0">
        <Link to="/home">
          <img src={logo} draggable='false' alt="logo" />
        </Link>
      </div>
      <div className="flex fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r from-lightPrimary to-primary items-center justify-between overflow-hidden md:relative md:rounded-s-[2rem] sm:ps-8 md:w-[70vw] max-w-[55rem]">
        {element}
        <div className="flex items-center my-2">
        {logged? page !== 'home' ? <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase" to='/profile'>
            <i className="fa-solid fa-user sm:hidden"></i>
            <span className="hidden sm:block">Profile</span>
          </Link> :  
          
          <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase" to='/'>
            <i className="fa-solid fa-people-roof sm:hidden"></i>
            <span className="hidden sm:block">MY Class</span>
          </Link> :
          <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase" to='/auth/login'>
            <i className="fa-solid fa-user sm:hidden"></i>
            <span className="hidden sm:block">Login</span>
          </Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
