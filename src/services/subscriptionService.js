import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const subscriptionServices = {
  makeRequest: async (url, method='GET', data='') => {
    setAxiosToken()
    const response = await axios({url, method, data})
    return response.data;
  },
  purchaseSubscription: async () => {
    setAxiosToken()
    return axios.post( BASE_URL + '/subscription').then(res=>{
      return res.data;
    }).catch((err) => {
      console.log(err)
    })
  },
  createIndent: async (plan) => {
    return subscriptionServices.makeRequest(BASE_URL + `/subscription?plan=${plan}`, 'GET')
  },
  createSubscription: async (data) => {
   return subscriptionServices.makeRequest(BASE_URL+'/subscription', "POST", data)
  },

};

export default subscriptionServices;