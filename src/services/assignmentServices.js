import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const makeRequest = async (url, method, data) => {
  try {
    setAxiosToken()
    const response = await axios({url, method, data})
    return response.data;
  } catch (error) {
    
  }
}

const assignmentService = {
  submitAssignment: async (classId, assignmentId, answer) => {
    setAxiosToken()
    return axios.post(BASE_URL + `/classes/${classId}/assignments/${assignmentId}/submissions`, answer ,{
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res=>{
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
  },
  getAssignment: async (submissionId, classId, assignmentId) => {
    try {
      setAxiosToken()
     const { data } = await axios.get(`${BASE_URL}/classes/${classId}/assignments/submissions/${submissionId}`)
     return data
    } catch (error) {
      
    }
  },
  updateSubmission: async (classId, submissionId, payload) => makeRequest(`${BASE_URL}/classes/${classId}/assignments/submissions/${submissionId}`, 'PATCH', payload)
};

export default assignmentService;
