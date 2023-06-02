import axios from "axios";
import { BASE_URL } from "../constant/constant"; 
import { getToken } from "../utils/storageHelper";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const adminServices = {
  makeRequest: async (url, method, data) => {
   try {
    setAxiosToken()
    const response = await axios({ url, method, data})
    return response.data;
   } catch (error) {
    console.log("%c server " + error.message, "color: green; font-weight:bold;");
   }
  },
  findAllUser: async () => {
    return adminServices.makeRequest(BASE_URL + '/admin/users', 'GET')
  },
  blockOrUnblock: async (userId) => {
    return adminServices.makeRequest(BASE_URL + '/admin/users', "PATCH", { userId })
  },
  findAllClasses: async () => {
    return adminServices.makeRequest(BASE_URL + '/admin/classes', "GET")
  },
  blockAndUnblockClass: async (classId) => {
    return adminServices.makeRequest(BASE_URL + '/admin/classes', "PATCH", { classId })
  }
};

export default adminServices;