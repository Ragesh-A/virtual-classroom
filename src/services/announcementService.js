import axios from "axios"
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const announcementServices = {
  makeRequest: async ( url, method, data ) => {
    try {
      setAxiosToken();
      const response = await axios({ url, method, data });
      return response.data;
    } catch (error) {
      console.log("%c server " + error.message, "color: green; font-weight:bold;");
    }
  }, 
  createAnnouncement: async (data) => announcementServices.makeRequest(`${BASE_URL}/announcement`, 'POST', data),
  getUserAnnouncement: async () => announcementServices.makeRequest(`${BASE_URL}/announcement?by=user `, 'GET'),
  getAllAnnouncement: async () => announcementServices.makeRequest(`${BASE_URL}/announcement/all`, 'GET')
}
export default announcementServices;