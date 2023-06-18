import axios from "axios"
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const quizServices = {
  makeRequest: async (url, method, data) => {
    try {
      setAxiosToken()
      const response = await axios({url:`${BASE_URL}/${url}`, method, data})
      return response.data;
    } catch (error) {
      console.log("%c server " + error.message, "color: green; font-weight:bold;");
    }
  },
  createQuiz: (data) => quizServices.makeRequest(`questions`, 'POST', data),
  getQuizzes: (classId) => quizServices.makeRequest(`questions?classId=${classId}`, 'GET')
}

export default quizServices;