import { Link, NavLink } from 'react-router-dom';
import Header from '../../common/Header';

const SingleClassHeader = () => {

  const classId = ''

return (
<Header>
  <div
    className="flex fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r from-lightPrimary to-primary items-center justify-between overflow-hidden md:relative md:rounded-s-[2rem] ps-8 md:w-[70vw] max-w-[50rem] ">
    <ul className="flex items-center">
      <NavLink to={`/class/${classId}`}
        className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav">
        <i className="fa-solid fa-people-roof sm:hidden"></i>
        <li className="hidden sm:block">Discussion panel</li>
      </NavLink>
      <NavLink to={`/class/${classId}`}
        className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav">
        <i className="fa-solid fa-video sm:hidden"></i>
        <li className="hidden sm:block">Class work</li>
      </NavLink>
      <NavLink to={`/class/${classId}/p`}
        className="border-t-4 border-transparent hover:border-white text-white font-bold p-[17px] me-1 nav">
        <i className="fa-solid fa-video sm:hidden"></i>
        <li className="hidden sm:block">Peoples</li>
      </NavLink>
    </ul>
    <div className="flex items-center my-2">
      <Link className="text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase">
      <i className="fa-solid fa-user sm:hidden"></i>
      <span className="hidden sm:block">Profile</span>
      </Link>
    </div>
  </div>
</Header>
);
};

export default SingleClassHeader;