import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/storageHelper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Shimmer from './common/Shimmer';
import authServices from '../services/authService';
import { useDispatch } from 'react-redux';
import { userLogOut, userLogin } from '../utils/store/userSlice';
import { BASE_URL } from '../constant/constant';
import AccessDenied from './common/AccessDenied';

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
     authServices.getMe().then(res=>{
      if (res?.success){
        dispatch(userLogin(res?.success?.user))
      }
      if(res?.success?.user?.isBlocked){
        dispatch(userLogOut())
        setTimeout(()=>{
          localStorage.clear();
          navigate('/home')},5000)
        setIsBlocked(true)
      }
    })
    getLocalStorage('authentication').then((token) => {
      if (!token) {
        setToken(false);
        navigate('/home');
      } else {
        setToken(true);
      }
    }).catch((err)=>{
      console.log(err);
    });
  }, [dispatch, location, navigate]);
  if (!token) {
    return <Shimmer />;
  }
  if (isBlocked) {
    return <AccessDenied />
  }
  axios.defaults.baseURL = BASE_URL
  // axios.defaults.withCredentials = true;
  return children;
};

export default PrivateRoute;
