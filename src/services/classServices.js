import axios from 'axios';
import { BASE_URL } from '../constant/constant';



const classServices = {
  getAllClasses: async  ()=>{
    try {
      const token = localStorage.getItem('authentication');

axios.defaults.headers.common['Authorization'] = token;
    return axios.get(BASE_URL+'/classes').then(res=>{
      if(res.data.token === false){
        localStorage.clear();
      }
      return res.data;
    }).catch(err=>{
      console.log(err.message);
    })
    } catch (error) {
      console.log('fucked')
    }
    
  }
}

export default classServices;