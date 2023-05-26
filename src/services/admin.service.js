import axios from "axios";
import { BASE_URL } from "../constant/constant"; 
import { getToken } from "../utils/storageHelper";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const adminServices = {
  findAllUser: async () => {
    setAxiosToken();
    return axios.get(BASE_URL + '/admin/users').then(res=>{
      return res.data
    }).catch(err=> {
      console.log(err);
    })
  },
  blockOrUnblock: async (userId) => {
    setAxiosToken();
    return axios.patch(BASE_URL + '/admin/users', {userId}).then(res=>{
      return res.data;
    })
  }
};

export default adminServices;