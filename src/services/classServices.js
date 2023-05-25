import axios from 'axios';
import { BASE_URL } from '../constant/constant';

const classServices = {
  getAllClasses: async () => {
    try {
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios
        .get(BASE_URL + '/classes')
        .then((res) => {
          if (res.data.token === false) {
            localStorage.clear();
          }
          if(res?.data?.success){
            return res?.data?.success;
          }
          return [];
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      
    }
  },
  
  createClass: async (values)=>{
    console.log(values.name)
      const token = localStorage.getItem('authentication');
      axios.defaults.headers.common['Authorization'] = token;
      return axios.post(BASE_URL + '/classes',values)
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
  }
};

export default classServices;
