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
  },
  getInstructors: async () => {
    setAxiosToken();
    return axios.get(BASE_URL + '/organizer/instructor').then(res=>{
      return res.data
    })
  },
  removeInstructor: async (instructor) => {
    setAxiosToken();
    return axios.delete(BASE_URL + `/organizer/instructor?instructor=${instructor}`).then(res=>{
      console.log(res.data)
    })
  },
  removeFromClass: async (classId, studentId) => {
    setAxiosToken()
    return axios.delete(`${BASE_URL}/classes/${classId}/students?student=${studentId}`).then(res=>{
      return res.data;
    }).catch(err=>{
      console.log(err)
    })
  }
};

export default organizerServices;