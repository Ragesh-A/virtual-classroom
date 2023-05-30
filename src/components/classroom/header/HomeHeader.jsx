import { Link, NavLink } from "react-router-dom";

const HomeHeader = () => {
  return (
    <ul className="flex items-center">
      <NavLink to="/home" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="fa-solid fa-people-roof sm:hidden"></i>
          <li className="hidden sm:block">Home</li>
      </NavLink>
      <a htmlFor='features' href="#features" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="fa-solid fa-people-roof sm:hidden"></i>
          <li className="hidden sm:block">Features</li>
      </a>
      <NavLink to="/home/" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="fa-solid fa-people-roof sm:hidden"></i>
          <li className="hidden sm:block">Contact</li>
      </NavLink>
      <NavLink to="/home/" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="fa-solid fa-people-roof sm:hidden"></i>
          <li className="hidden sm:block">Meet up</li>
      </NavLink>
    </ul>
  )
};

export default HomeHeader;