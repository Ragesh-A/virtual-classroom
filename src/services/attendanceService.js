import axios from "axios"
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const attendanceService = {
  makeRequest: async (url, method, data) => {
    try {
      setAxiosToken()
      const response = await axios({ url, method, data });
      return response.data
    } catch (error) {
      console.log("%c server " + error.message, "color: green; font-weight:bold;");
    }
  },
  getTodayAttendance: async (classId) => attendanceService.makeRequest(`${BASE_URL}/classes/${classId}/attendance`, 'GET'),
  submitAssignment: async (classId, attendance) => attendanceService.makeRequest(`${BASE_URL}/classes/${classId}/attendance/`, 'POST', { attendance })
}

export default attendanceService;