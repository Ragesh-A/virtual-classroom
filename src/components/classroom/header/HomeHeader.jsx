import { Link, NavLink } from "react-router-dom";

const HomeHeader = () => {
  return (
    <ul className="flex items-center">
      <Link htmlFor='home' href="/home" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="ri-home-2-fill lg:hidden"></i>
          <li className="hidden lg:block">Home</li>
      </Link>
      <a htmlFor='features' href="#features" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="ri-list-indefinite lg:hidden"></i>
          <li className="hidden lg:block">Features</li>
      </a>
      <a htmlFor="contact" href="#contact" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
      <i className="ri-customer-service-2-fill lg:hidden"></i>
          <li className="hidden lg:block">Contact</li>
      </a>
      <NavLink to="/meetup" className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav" >
          <i className="ri-vidicon-fill lg:hidden"></i>
          <li className="hidden lg:block">Meet up</li>
      </NavLink>
    </ul>
  )
};

export default HomeHeader;