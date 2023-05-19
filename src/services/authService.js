import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { getLocalStorage } from '../utils/storageHelper';

const authServices = {
  signUp: async (userData) => {
    return axios
      .post(BASE_URL + '/auth/signup', userData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  login: async (userData) => {
    return axios.post(BASE_URL + '/auth/login', userData).then((res)=>{
      return res.data
    }).catch(err=>{
      return err;
    });
  },
  verifyEmail: async (userId, uuid) => {
    return axios.post(BASE_URL+ `/auth/verify-email`, {userId, uuid}).then(res=>{
      return res.data;
    }).catch(err=>{
      return err;
    })
  },
  checkToken: () => {
    return getLocalStorage('authentication')

  }
};

export default authServices;
