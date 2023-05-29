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
    console.log('called');
    return axios.post(BASE_URL + `/assignments/${classId}/assignments/${assignmentId}/submissions`, { answer }).then(res=>{
      console.log(res.data)
      return res.data;
    })
  },
  createBulkAssignment: async () => {
    setAxiosToken();
    return 
  }
};

export default assignmentService;
