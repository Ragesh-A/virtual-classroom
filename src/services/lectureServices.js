import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const lectureServices = {
  allStudents: async (classId) => {
    setAxiosToken()
    return axios.get(`${BASE_URL}/classes/${classId}/students`).then(res=>{
      return res.data;
    }).catch(err=>{
      return err;
    })
  },
  acceptRequest: async (classId, studentId)=>{
    setAxiosToken()
    return axios.patch(`${BASE_URL}/classes/join`, { studentId: studentId, classId: classId }).then(res=>{
      console.log(res.data)
      return res.data;
    }).catch(err=>{
      console.log(err, 'accept request');
    })
  },
  rejectRequest: async (classId, studentId)=>{
    setAxiosToken()
    return axios.delete(`${BASE_URL}/classes/join?class=${classId}&&student=${studentId}`).then(res=>{
      console.log(res.data)
      return res.data;
    }).catch(err=>{
      console.log(err, 'accept request');
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
}

export default lectureServices;