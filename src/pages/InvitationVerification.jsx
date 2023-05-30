import { useParams } from "react-router";
import { getToken } from "../utils/storageHelper";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { useState } from "react";
import image from '../assets/images/verified.gif'

const InvitationVerification = () => {

  const {uuid, organizationId} = useParams();
  const [verified, setVerified] = useState(false)
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = token;
  
  const joinHandle = () => {
    axios.patch(BASE_URL + '/organizer/instructor',{uuid, organizationId}).then(res=>{
      console.log(res.data)
      setVerified(true)
    })
  }


  return (
    <div className="h-[100vh] grid place-items-center">
      {!verified ? <button className="btn bg-green-400 rounded text-white font-extrabold shadows shadow-green-400" onClick={joinHandle}>JOIN</button> : <>
      
      <div className="">
      <img src={image} alt="verified"/>
      <p className="uppercase text-primary font-bold">Verified</p>
      </div>
      </>}
    </div>
  )
};

export default InvitationVerification;