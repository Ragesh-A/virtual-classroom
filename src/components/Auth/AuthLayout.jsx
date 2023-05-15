import { Outlet } from "react-router";
import bg from '../../assets/images/authLayoutBg.png'

const AuthLayout = ()=>{
  <div className="h-[100vh] relative from-darkPrimary to-primary overflow-hidden max-w-[1920px] max-h-[1080px] m-auto rounded-md p-10 bg-gradient-to-b ">
      <img src={bg} className="w-[1920px] h-full absolute top-0 left-0" alt="background"/>
      <Outlet />
    </div>
}

export default AuthLayout;