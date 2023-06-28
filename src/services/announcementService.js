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
  getClassAnnouncement: async (classId) => announcementServices.makeRequest(`${BASE_URL}/announcement?by=class&value=${classId} `, 'GET'),
  getAllClassAnnouncement: async (classId) => announcementServices.makeRequest(`${BASE_URL}/announcement/class/${classId}/all`, 'GET'),
  getAnnouncement: async (announcementId) => announcementServices.makeRequest(`${BASE_URL}/announcement/${announcementId}`, 'GET'),
  updateAnnouncement: async (values, announcementId) => announcementServices.makeRequest(`${BASE_URL}/announcement/${announcementId}`, 'PATCH', values),
  deleteAnnouncement: async (announcementId) => announcementServices.makeRequest(`${BASE_URL}/announcement/${announcementId}`, 'DELETE'),
  getAllAnnouncement: async () => announcementServices.makeRequest(`${BASE_URL}/announcement?by=organization`, 'GET')
}
export default announcementServices;