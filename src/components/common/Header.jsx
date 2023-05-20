import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-dark.png'
const Header = ({list, button})=>{
  return(
    <header className='flex justify-between pt-8 ps-10  rounded-bl-xl'>
      <div className="max-w-[4rem] flex items-center">
        <Link to='/home'><img src={logo} alt="logo" /></Link>
      </div>
      <div className="bg-gradient-to-l from-primary to-lightPrimary flex items-center justify-between rounded-s-[2rem] ps-8 overflow-hidden w-[50vw] min-w-[35rem]">
        <ul className='flex'>
          {list.map((list,i)=>(
            <li key={list?.title+i} className='border-t-4 border-transparent hover:border-white py-5 me-5'>
              <Link to={list?.path} className='text-white font-bold px-2 py-10'>{list?.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
            <Link className='text-primary font-bold bg-white p-3 px-6 ps-8 rounded-s-[2rem] uppercase' to={button?.path}>{button?.title}</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;