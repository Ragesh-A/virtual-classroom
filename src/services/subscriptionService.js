import axios from "axios";
import { getToken } from "../utils/storageHelper";
import { BASE_URL } from "../constant/constant";

const setAxiosToken = () => {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = token;
}

const subscriptionServices = {
  purchaseSubscription: async () => {
    setAxiosToken()
    return axios.post( BASE_URL + '/subscription').then(res=>{
      return res.data;
    }).catch(err=>{
      console.log(err)
    })
  }
};

export default subscriptionServices;