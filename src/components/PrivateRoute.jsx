import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/storageHelper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Shimmer from './common/Shimmer';
import authServices from '../services/authService';
import { useDispatch } from 'react-redux';
import { userLogOut, userLogin } from '../utils/store/userSlice';

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
        localStorage.clear();
        setTimeout(()=>{navigate('/home')},5000)
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
    return <h1>Blocked</h1>
  }

  axios.defaults.headers.common['Authorization'] = token;
  return children;
};

export default PrivateRoute;
