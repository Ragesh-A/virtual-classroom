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
  createQuiz: async (data) => quizServices.makeRequest(`questions`, 'POST', data),
  getQuizzes: async (classId) => quizServices.makeRequest(`questions?classId=${classId}`, 'GET'),
  getQuizzesByOrg: async () => quizServices.makeRequest(`questions/organization`, 'GET'),
  getQuestion: async (questionId) => quizServices.makeRequest(`questions/${questionId}`, 'GET'),
  submitAnswer: async (questionId, answer) => quizServices.makeRequest(`questions/${questionId}/submission`, 'POST', answer),
  isSubmitted: async (questionId) => quizServices.makeRequest(`questions/${questionId}/isSubmitted`, 'GET'),
  submitQuestionAnswer: async (questionId, answer) => quizServices.makeRequest( )

}

export default quizServices;