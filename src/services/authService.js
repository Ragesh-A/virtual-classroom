import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { getLocalStorage } from '../utils/storageHelper';

const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const authServices = {
  signUp: async (userData) => {
    return handleRequest(() => axios.post(BASE_URL + '/auth/signup', userData));
  },

  login: async (userData) => {
    return handleRequest(() => axios.post(BASE_URL + '/auth/login', userData));
  },

  verifyEmail: async (userId, uuid) => {
    return handleRequest(() => axios.post(BASE_URL + '/auth/verify-email', { userId, uuid }));
  },

  requestResetOtp: async (emailOrPhone) => {
    return handleRequest(() => axios.post(BASE_URL + '/auth/password-reset-request', { emailOrPhone }));
  },

  resetPassword: async (payload) => {
    return handleRequest(() => axios.patch(BASE_URL + '/auth/password', payload));
  },

  checkToken: () => {
    return getLocalStorage('authentication');
  },

  verifyOtp: async (emailOrPhone, otp) => {
    return handleRequest(()=> axios.post(BASE_URL + '/auth/verify-otp', { emailOrPhone, otp }))
  },
  getMe: async (_id) => {
    return handleRequest(()=>{
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.get(BASE_URL + '/auth/find-me')
    })
  },
  updateProfile: async (values) => {
    return handleRequest(() => {
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.patch(BASE_URL + '/profile', values, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    })
  }
};

export default authServices;
