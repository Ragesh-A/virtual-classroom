import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = token;
};

const chatServices = {
  makeRequest: async (url, method, data) => {
    try {
      setAxiosToken()
      const response = await axios({url, method, data})
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
  getChats: async () => chatServices.makeRequest(BASE_URL + '/chat', 'GET')
}

export default chatServices;