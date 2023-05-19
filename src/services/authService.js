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
    return axios
      .post(BASE_URL + '/auth/login', userData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  verifyEmail: async (userId, uuid) => {
    return axios
      .post(BASE_URL + `/auth/verify-email`, { userId, uuid })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  checkToken: () => {
    return getLocalStorage('authentication');
  },
  requestResetOtp: async (emailOrPhone) => {
    return axios
      .post(BASE_URL + '/auth/password-reset-request', { emailOrPhone })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  resetPassword: async (payload) =>{
    return axios.patch(BASE_URL + '/auth/password', payload).then(res=>{return res.data}).catch(err=>{return err})
  }
};

export default authServices;
