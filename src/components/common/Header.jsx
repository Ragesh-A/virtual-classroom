import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-dark.png';

const Header = ({ children }) => {
  return (
    <header className="flex justify-between pt-8 ps-5 md:ps-16 pb-10 rounded-bl-xl">
      <div className="max-w-[4rem] flex items-center">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {children}
    </header>
  );
};

export default Header;
