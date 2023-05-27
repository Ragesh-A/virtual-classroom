import { useParams } from "react-router";
import { getToken } from "../utils/storageHelper";
import axios from "axios";
import { BASE_URL } from "../constant/constant";

const InvitationVerification = () => {

  const {uuid, organizationId} = useParams();
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = token;
  
  const joinHandle = () => {
    axios.patch(BASE_URL + '/organizer/instructor',{uuid, organizationId}).then(res=>{
      console.log(res.data)
    })
  }


  return (
    <div className="h-[100vh] grid place-items-center">
      <button className="btn bg-green-400 rounded text-white font-extrabold shadows shadow-green-400" onClick={joinHandle}>JOIN</button>
    </div>
  )
};

export default InvitationVerification;