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
          return res.data;
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
        console.log(res.data,'derv')
      }).catch(err=>err)

  },
  joinClass: async (uuid) => {
    const token = localStorage.getItem('authentication');
    axios.defaults.headers.common['Authorization'] = token;
    return axios.post(BASE_URL + '/classes/join', {uuid}).then(res=>{
      console.log(res)
    })
  }
};

export default classServices;
