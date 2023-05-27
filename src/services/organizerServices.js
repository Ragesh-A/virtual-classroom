import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { getToken } from '../utils/storageHelper';

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const organizerServices = {
  allClasses: async () => {
    setAxiosToken();
    return axios.get(BASE_URL + '/organizer/classes').then(res=>{
      return res.data;
    }).catch(err=>{
      console.log(err);// axios errors
    })
  },
  singleClass: async (classId) => {
    setAxiosToken();
    return axios.get(BASE_URL + '/classes/'+ classId).then(res=>{
      return res.data;
    }).catch(err=>{
      console.log(err);// axios errors
    })
  },
  sendInvitation: async (emailOrPhone, message) =>{
    setAxiosToken();
    return axios.post(BASE_URL + '/organizer/instructor', {emailOrPhone, message}).then(res=>{
      return res.data
    })
  }
};

export default organizerServices;