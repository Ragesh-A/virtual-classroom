import axios from 'axios';
import { getToken } from '../utils/storageHelper';
import { BASE_URL } from '../constant/constant';

const setAxiosToken = () => {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = token;
};

const lectureServices = {
  makeRequest: async (url, method, data) => {
    try {
     setAxiosToken()
     const response = await axios({ url, method, data, headers: {
      'Content-Type': 'multipart/form-data',
     }})
     return response.data;
    } catch (error) {
     console.log("%c server " + error.message, "color: green; font-weight:bold;");
    }
   },
  allStudents: async (classId) => {
    setAxiosToken();
    return axios
      .get(`${BASE_URL}/classes/${classId}/students`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  acceptRequest: async (classId, studentId) => {
    setAxiosToken();
    return axios
      .patch(`${BASE_URL}/classes/join`, {
        studentId: studentId,
        classId: classId,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err, 'accept request');
      });
  },
  rejectRequest: async (classId, studentId) => {
    setAxiosToken();
    return axios
      .delete(`${BASE_URL}/classes/join?class=${classId}&&student=${studentId}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err, 'accept request');
      });
  },
  removeFromClass: async (classId, studentId) => {
    setAxiosToken();
    return axios
      .delete(`${BASE_URL}/classes/${classId}/students?student=${studentId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createAssignment: async (classId, values) => {
    setAxiosToken();
    return axios
      .post(`${BASE_URL}/classes/${classId}/assignments/`, { classId, ...values },{
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        return res.data;
      }
    );
  },
  allAssignments: async (classId)=> {
    setAxiosToken();
    return axios.get(`${BASE_URL}/classes/${classId}/assignments/`).then(res=> res.data)
  },
  getAssignment: async (classId, assignmentId) => {
    return lectureServices.makeRequest(BASE_URL + `/classes/${classId}/assignments/${assignmentId}`, 'GET');
  },
  updateAssignment: async (classId, assignmentId, values) => {
    return lectureServices.makeRequest(BASE_URL + `/classes/${classId}/assignments/${assignmentId}`, 'PATCH', values );
  },
  allSubmissions: async (classId, assignmentId) => {
    setAxiosToken();
    return axios.get(BASE_URL + `/classes/${classId}/assignments/${assignmentId}/submissions`).then(res=>{
      return res.data;
    })
  }
};

export default lectureServices;