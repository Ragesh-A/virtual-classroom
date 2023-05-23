import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/storageHelper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Shimmer from './common/Shimmer';

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLocalStorage('authentication').then((token) => {
      if (!token) {
        setToken(false);
      } else {
        setToken(true);
        axios.defaults.headers.common['Authorization'] = token;
      }
    });
  }, []);
  if (token === null) {
    return <Shimmer />;
  }
  if (token === false) {
    return navigate('/auth/login');
  }
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    return children;
  }
};

export default PrivateRoute;
