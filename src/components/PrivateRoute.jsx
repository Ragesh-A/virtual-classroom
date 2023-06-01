import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/storageHelper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Shimmer from './common/Shimmer';

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLocalStorage('authentication').then((token) => {
      if (!token) {
        setToken(false);
        navigate('/home');
      } else {
        setToken(true);
      }
    });
  }, [navigate]);
  if (!token) {
    return <Shimmer />;
  }

  axios.defaults.headers.common['Authorization'] = token;
  return children;
};

export default PrivateRoute;
