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
      const response = await axios({url, method, data})
      return response.data;
    } catch (error) {
      console.log("%c server " + error.message, "color: green; font-weight:bold;");
    }
  },
  createQuiz: (data) => quizServices.makeRequest(`${BASE_URL}/questions`, 'POST', data)
}

export default quizServices;