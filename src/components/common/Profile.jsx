import Section from '../layouts/Section';
import profile from '../../assets/images/pexels-pixabay-415829.jpg';
import { useEffect } from 'react';
import { useState } from 'react';
import authServices from '../../services/authService';
import Shimmer from './Shimmer';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../utils/store/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [me, setMe] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    authServices.getMe().then(res=>{
      console.log( res,'me');
      setMe(res?.success?.user)
    })
  }, [])

  const logout = () => {
    dispatch(userLogOut())
    localStorage.clear();
    navigate('/home')
  }

  console.log(me, "dddd");
  return (
    <Section>
      <div className="bg-blue-50 p-1 rounded-md grid gap-5">
        <div className="border-2 border-white bg-tileColor p-2  rounded-lg md:grid md:grid-cols-2 gap-2.5 md:p-10">
          <div className="flex flex-col md:flex-row gap-5">
            <div className='flex items-center gap-5'>
              <img draggable='false' src={profile} alt="user profile" className="max-w-[10rem] rounded-xl border-2 border-white"/>
              <p className='font-bold text-primary text-9xl md:hidden'>B</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className='font-bold text-2xl text-textColor'>Eva</p>
              <input type="range" />
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <p className='text-center font-bold text'>21</p>
                  <p className='text-center'>completed assignment</p>
                </div>
                <div className="">
                  <p className='text-center font-bold text'>21</p>
                  <p className='text-center'>Missed assignment</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden text-center md:flex items-center justify-center">
            <p className="font-bold uppercase text-9xl text-primary">B</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {!me ? <Shimmer /> : 
          <div className="border-2 border-white p-2 px-5 rounded-md grid gap-2">
            <div className=' flex flex-col xl:flex-row items-center'>
              <label htmlFor="name" className='w-20 xl:w-36 font-bold xl:text-xl text-slate-800'>name:</label>
              <p className='font-bold text-slate-600'>{me?.name}</p>
            </div>
            <div className=' flex flex-col xl:flex-row items-center'>
              <label htmlFor="name" className='w-20 xl:w-36 font-bold xl:text-xl text-slate-800'>email:</label>
              <p className='font-bold text-slate-600'>{me?.emailOrPhone}</p>
            </div>
            <div className=' flex flex-col xl:flex-row items-center'>
              <label htmlFor="name" className='w-20 xl:w-36 font-bold xl:text-xl text-slate-800'>subscription:</label>
              <p className='font-bold text-slate-600'>{me.subscriber.status ? 'ends ' + me.subscriber.expire.split('T')[0] : 'no subscription'}</p>
            </div>
            <div className="">
              <button className='btn overflow-hidden bg-primary text-white rounded-md' onClick={logout}>Logout</button>
            </div>
          </div> }
          <div className="border-2 border-white p-2 px-5 rounded-md "></div>
        </div>
      </div>
    </Section>
  );
};

export default Profile;
