import { Outlet } from 'react-router';
import bg from '../../assets/images/authLayoutBg.png';
import authServices from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AuthLayout() {
  const navigate =  useNavigate()
  
  useEffect(()=>{
    authServices.checkToken().then((token)=>{
      if(token){
        navigate('/')
      }
    });
   
  })
  return (
    <div className="h-[100vh] relative from-darkPrimary to-primary overflow-hidden max-w-[1920px] max-h-[1080px] m-auto rounded-md p-10 bg-gradient-to-b ">
      <img src={bg} className="w-[1920px] h-full absolute top-0 left-0" alt="background" />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
