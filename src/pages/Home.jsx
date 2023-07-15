import { useState } from 'react';
import Header from '../components/classroom/header/Header';
import Section from '../components/layouts/Section';
import image from '../assets/images/pexels-julia-m-cameron-4144230.jpg';
import image2 from '../assets/images/R.jpg';
import { BASE_URL, BASIC_FEATURES, PREMIUM_FEATURES } from '../constant/constant';
import contactImage from '../assets/images/support.png';
// import image3 from '../assets/images/analytics-report.png'
// import image4 from '../assets/images/chat.png'
// import image5 from '../assets/images/exams.png'
// import image6 from '../assets/images/notifications.png'
// import image7 from '../assets/images/progress.png'
// import image8 from '../assets/images/video-conference.png'
// import { decodeUser } from "../utils/storageHelper";
// import { useNavigate } from "react-router-dom";
import Notification from '../components/common/Notification';
import Subscription from './Subscription';
import './homeAnimation';
import { useDispatch } from 'react-redux';
import { setNotification } from '../utils/store/uiSlice';
import axios from 'axios';

const Home = () => {
  const [plan, setPlan] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const clickHandle = (plan) => {
    setPlan(plan);
  };

  const handleContact = async (e) => {
    e.preventDefault();
    let error;
    if (!name.trim()) { error = 'name is required'}
    else if (!email.trim()) { error = 'email is required'}
    else if (!message.trim()) { error = 'message is required'}
    if (!error) {
      try {
        const {data} = await axios.post(`${BASE_URL}/message/send-mail`, {
          name: name.trim(), sender: email.trim(), message: message.trim()
        })
        if (data?.success?.isSended) {
          setName('')
          setEmail('')
          setMessage('')
        }
        dispatch(setNotification({ 
          success: data?.success?.isSended,
          message: data?.success?.isSended ? 'mail is sended' : 'failed to send mail'
        }))
      } catch (error) {
        
      }
    }
    else {
      dispatch(setNotification({ success: false, message: error }))
    }
  };

  return (
    <>
      <div className="body">
        <Notification />
        <div className="main min-h-screen 2xl:min-h-[600px]">
          <Header page="home" />
          <Section
            className="flex flex-col-reverse md:flex-row min-h-screen 2xl:min-h-[600px] md:min-h-[70vh] relative  items-center"
            id="home"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-xl lg:text-2xl mt-5 md:mt-0 lg:leading-10 md:text-xl font-bold text-textColor md:leading-[2rem] xl:leading-[3rem]">
                Unlock Your Potential Anywhere, Anytime: Experience the Future
                of Learning with our
              </p>
              <p className="font-bold text-center text-primary text-4xl sm:text-5xl lg:text-6xl md:text-4xl md:text-left mt-2 lg:mt-5 mb-10 lg:mb-14">
                Digital Classroom
              </p>
              <a
                htmlFor="features"
                href="#features"
                className="border-none rounded-md px-14 py-4  overflow-hidden bg-primary text-white"
              >
                Explore
              </a>
              <div className="absolute hidden sm:block z-0 py-8 left-0 bottom-40 md:bottom-0 bg-gradient-to-r from-indigo-300 to-indigo-100 rounded-e-[10rem] w-3/4 lg:w-1/2"></div>
            </div>
            <div className="md:flex-1 flex items-center justify-center">
              <div className="max-w-[125px] md:max-w-[300px] animate-pulse overflow-hidden triangle-shape flex justify-center items-center rounded-3xl">
                <img
                  draggable="false"
                  src={image}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          </Section>
        </div>

        <Section className="min-h-screen 2xl:min-h-[600px] flex flex-col items-center">
          <h2 className="text-textColor text-4xl font-bold lg:hidden text-left">
            Features
          </h2>
          <div
            className=" m-auto max-w-7xl grid xl:grid-cols-2 items-center gap-10 xl:gap-28"
            id="features"
          >
            <div className="items-center md:p-5 xl:p-0">
              <img draggable="false" src={image2} alt="" />
            </div>
            <div className="">
              <h2 className=" text-5xl mb-9 font-bold text-textColor hidden lg:block">
                Features
              </h2>
              <div className="flex gap-2 flex-wrap">
                {BASIC_FEATURES.map((feature) => (
                  <div
                    className="border-white border-2 bg-white bg-opacity-50 text-textColor  py-3 px-5 lg:px-7 rounded-xl text-sm md:text-xl flex-grow font-bold md:font-normal capitalize"
                    key={feature.name}
                  >
                    <i className={`${feature.class} mr-5`}></i>
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className="min-h-screen 2xl:min-h-[600px] m-auto max-w-7xl flex flex-col-reverse xl:grid md:grid-cols-2 items-center gap-10 xl:gap-28">
            <div className="">
              <h2 className=" text-5xl mb-9 font-bold text-textColor hidden lg:block">
                <i className="fa-solid fa-fire-flame-curved text-primary mr-5 animate-pulse"></i>
                Features
              </h2>
              <div className="flex gap-2 flex-wrap">
                {PREMIUM_FEATURES.map((feature) => (
                  <div
                    className="border-white border-2 bg-white bg-opacity-50 text-textColor  py-3 px-5 lg:px-7 rounded-xl text-sm md:text-xl flex-grow font-bold md:font-normal capitalize"
                    key={feature.name}
                  >
                    <i className={`${feature.class} mr-5`}></i>
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
              <div className="pt-5 flex flex-col mt-5 md:flex-row gap-2 xl:gap-10 justify-between">
                <button
                  className="px-10 py-3 md:py-5 flex-1 overflow-hidden rounded bg-gradient-to-r from-slate-500 to-black text-white text-lg  flex justify-between md:max-w-[250px]"
                  onClick={() => clickHandle('monthly')}
                >
                  <span className="text-2xl font-bold">₹10</span>
                  <span>1 month</span>
                </button>

                <button
                  className="shim px-10 py-3 md:py-5 flex-1 overflow-hidden rounded bg-gradient-to-r from-indigo-400 to-indigo-700 text-white text-lg flex justify-between md:max-w-[250px]"
                  onClick={() => clickHandle('yearly')}
                >
                  <span className="text-2xl font-bold">₹100</span>
                  <span>12 month</span>
                </button>
              </div>
            </div>
            <div className="items-center">
              <h2 className=" text-4xl mb-9 font-bold text-textColor lg:hidden">
                <i className="fa-solid fa-fire-flame-curved text-primary mr-5 animate-pulse"></i>
                Features
              </h2>
              <img
                draggable="false"
                src={image2}
                alt=""
                className="md:p-5 xl:p-0"
              />
            </div>
          </div>
        </Section>

        {plan && <Subscription plan={plan} setPlan={setPlan} />}

        <Section>
          <div className="lg:grid md:grid-cols-2 gap-6" id="contact">
            <div className="border-2 border-white p-9 rounded-xl w-full xl:max-w-xl m-auto">
              <h3 className="text-center text-primary font-bold text-2xl my-5">
                Contact
              </h3>
              <form onSubmit={handleContact}>
                <div className="border-b-4 border-b-primary rounded-md flex px-5 py-2 gap-5 items-center mb-5">
                  <i className="fa-solid fa-user text-primary"></i>
                  <input
                  placeholder='name'
                    type="text"
                    name="name"
                    id="name"
                    className="bg-transparent w-full outline-none"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>
                <div className="border-b-4 border-b-primary rounded-md flex px-5 py-2 gap-5 items-center">
                  <i className="fa-solid fa-envelope text-primary"></i>
                  <input
                  placeholder='email'
                    type="email"
                    name="email"
                    id="email"
                    className="bg-transparent w-full outline-none"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                  />
                </div>
                <div className="border-b-4 border-b-primary rounded-md flex px-5 py-2 gap-5">
                  <textarea
                  placeholder='message'
                    name="message"
                    id="message"
                    className="w-full bg-transparent outline-none"
                    rows="10"
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-lightPrimary text-white btn rounded-xl overflow-hidden mt-5"
                >
                  connect
                </button>
              </form>
            </div>
            <div className="hidden lg:flex justify-center items-center w-full">
              <img
                draggable="false"
                src={contactImage}
                alt=""
                className="max-w-md h-auto"
              />
            </div>
          </div>
        </Section>

        <Section>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-[2rem]">
        
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image3} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image4} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image5} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image6} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image7} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center md:justify-start h-[350px] max-w-[530px] mx-auto animate-on-scroll">
            <div className="absolute bg-indigo-100 w-[85%] h-full shape top-0 right-0"></div>
            <div className="">
             <img draggable='false' src={image8} alt="" className="max-w-[20rem] relative"/>
            </div>
          <div className="relative">text</div>
        </div>
        
      </div> */}
          <marquee behavior="" direction="left">
            <div className="flex gap-3">
              {PREMIUM_FEATURES.map((feature) => (
                <div
                  className="border-white border-2 bg-white bg-opacity-50 text-textColor  py-3 px-7 rounded-xl text-xl"
                  key={feature.name}
                >
                  <i className={`${feature.class} mr-5`}></i>
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </marquee>
          <marquee behavior="" direction="right">
            <div className="flex gap-3">
              {PREMIUM_FEATURES.map((feature) => (
                <div
                  className="border-white border-2 bg-white bg-opacity-50 text-textColor  py-3 px-7 rounded-xl text-xl"
                  key={feature.name}
                >
                  <i className={`${feature.class} mr-5`}></i>
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </marquee>
        </Section>
      </div>
    </>
  );
};

export default Home;
