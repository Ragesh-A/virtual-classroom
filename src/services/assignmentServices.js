import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const assignmentService = {
  submitAssignment: async (classId, assignmentId, answer) => {
    setAxiosToken()
    return axios.post(BASE_URL + `/classes/${classId}/assignments/${assignmentId}/submissions`, answer ,{
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res=>{
      console.log(res.data)
      return res.data;
    })
  },
  createBulkAssignment: async (classId, values) => {
    setAxiosToken();
    return axios.post(`${BASE_URL}/classes/${classId}/assignments/`, values).then((res)=>{
      return res.data;
    })
  },
  getAssignments: async (classId, q) => {
    setAxiosToken()
    return axios.get(`${BASE_URL}/classes/${classId}/assignments?q=${q}`).then((res)=>{
      return res.data;
    }).catch((error)=>{})
  }
};

export default assignmentService;
