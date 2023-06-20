import { useParams } from 'react-router';
import { getToken } from '../utils/storageHelper';
import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { useEffect, useState } from 'react';
import image from '../assets/images/verified.gif';
import ImageTextLayout from '../components/layouts/ImageTextLayout';
import background from '../assets/images/teacher.webp';
import Header from '../components/classroom/header/Header';
import { Link, useNavigate } from 'react-router-dom';

const InvitationVerification = () => {
  const { uuid, organizationId } = useParams();
  const [verified, setVerified] = useState(false);
  const token = getToken();
  const navigate = useNavigate()
  
  axios.defaults.headers.common['Authorization'] = token;

  const joinHandle = () => {
    axios
      .patch(BASE_URL + '/organizer/instructor', { uuid, organizationId })
      .then((res) => {
        console.log(res.data);
        setVerified(true);
      });
  };

  useEffect(()=>{
    if (!token) {
      console.log(token);
      navigate('/auth/login')
    } 
  })

 

  return (
    <div className="">
      <Header page='allClass' />
      <ImageTextLayout className="h-full">
        <div className="flex-1 text-center ">
          <p className=' text-xl md:text-2xl font-bold tracking-widest text-textColor'>Invitation as </p>
          <p className='text-3xl md:text-5xl font-bold tracking- text-primary'>INSTRUCTOR</p>
          <p className='my-2 text-gray-400 max-w-[500px] mx-auto px-5'>Once you have completed the registration, you will gain access to our lecturer dashboard, where you can manage your courses, interact with students, and contribute to the learning community</p>
          {!verified ? <button className="px-8 py-2  bg-primary mt-5 rounded text-white font-extrabold shadows shadow-green-400" onClick={joinHandle}>JOIN</button> : <>
      
      <div className="flex justify-center flex-col">
      <img draggable='false' src={image} alt="verified" className='m-auto max-w-[50px]'/>
      <p className="uppercase text-primary font-bold">Verified</p>
      <Link to='/' className='text-blue-500 underline'>go to classes</Link>
      </div>
      </>}
        </div>
        <div className="flex-1 justify-center flex">
          <img src={background} alt="" className="max-w-[300px] md:max-w-[800px]" />
        </div>
      </ImageTextLayout>
    </div>
  );
};

export default InvitationVerification;
