import axios from 'axios';
import { BASE_URL } from '../constant/constant';

const ClassServices = {
  getAllClasses: async () => {
    try {
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.get(BASE_URL + '/classes').then((res) => {
          if (res.data.token === false) {
            localStorage.clear();
          }
          if(res?.data?.success){
            return res?.data?.success;
          }
          return [];
        });
    } catch (error) {
      
    }
  },
  
  createClass: async (values)=>{
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.post(BASE_URL + '/classes',values,{
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res=>{
        return res?.data
      }).catch(err=>err)

  },
  joinClass: async (uuid) => {
    const token = localStorage.getItem('authentication');
    axios.defaults.headers.common['Authorization'] = token;
    return axios.post(BASE_URL + '/classes/join', {uuid}).then(res=>{
      return res.data;
    }).catch(err=>
      console.log(err))
  },
  getClass: async (classId) => {
    const token = localStorage.getItem('authentication');
    axios.defaults.headers.common['Authorization'] = token;
    return axios.get(`${BASE_URL}/classes/${classId}`).then(res =>{
      return res.data
    })
  },
  updateClass: async (classId, name, description, instructor=null) => {
    const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.patch(BASE_URL + '/classes/'+ classId, {name, description, instructor}).then((res)=>{
        console.log(res.data);
        return res.data;
      })
  },
};

export default ClassServices;
