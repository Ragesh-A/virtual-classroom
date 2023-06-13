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
  createConnection: async (classId, receiverId) => chatServices.makeRequest(BASE_URL + '/chat', 'POST', {classId, receiverId}),
  getChats: async () => chatServices.makeRequest(BASE_URL + '/chat', 'GET'),
  getMessages: async (chatId) => chatServices.makeRequest(`${BASE_URL}/message/${chatId}`, "GET"),
  sendMessage: async (chatId, message) => chatServices.makeRequest(BASE_URL + '/message', 'POST', { chatId, message }),
  accessChat: async (classId, receiverId) => chatServices.makeRequest(`${BASE_URL}/classes/${classId}/chat`, 'POST', { receiverId }),
  createGroupChat: async (classId, payload) => chatServices.makeRequest(`${BASE_URL}/classes/${classId}/chat/group`, 'Post', payload),
  allChats: async (classId) => chatServices.makeRequest(`${BASE_URL}/classes/${classId}/chat`, 'GET')
}

export default chatServices;