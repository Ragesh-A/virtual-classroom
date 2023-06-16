import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import authServices from "../../services/authService";
import verifiedImg from '../../assets/images/verified.gif'
import loading from '../../assets/images/loader.gif'

const EmailVerification = () => {

  const [verified, setVerified] = useState(false);
  const {userId, uuid } = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    authServices.verifyEmail(userId, uuid).then(res=>{
      if (res?.success?.status){
        setVerified(res?.success?.status)
        setTimeout(()=>{
          navigate('/auth/login');
        }, 3000)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center flex-col">
      <img src={verified ? verifiedImg : loading} draggable='false' alt="verification"/> 
      <div className="">
      <p className="text-3xl text-center text-purple-400 font-bold">{ verified ? "email is verified successfully" : "waiting for email verification...."}</p>
      </div>
    </div>

  )
};

export default EmailVerification;