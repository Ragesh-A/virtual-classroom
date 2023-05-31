import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { getLocalStorage } from '../utils/storageHelper';

const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    return error;
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
  }
};

export default authServices;
