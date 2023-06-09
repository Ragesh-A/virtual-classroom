import { useEffect, useRef, useState } from 'react';
import bg from '../../assets/images/video-conference.png';
import Header from '../../components/classroom/header/Header';
import WaitingPlace from '../../components/video-conference/WaitingPlace';
import { io } from 'socket.io-client'
import { MEETUP_SOCKET_IP } from '../../constant/constant';
import { useSelector } from 'react-redux';

const Home = () => {
  const [tab, setTab] = useState('home');
  const [newRoom, setNewRoom] = useState(false)
  const [localStream, setLocalStream] = useState()
  const socket = useRef()
  const { user } = useSelector(store=>store.user)

  useEffect(()=>{
    socket.current = io(MEETUP_SOCKET_IP)
    socket.current.emit('login', { user: user?.emailOrPhone })
    return () => {
      socket.current.disconnect()
    }
  },[user])


  const openMediaDevices = async (config) => {
    return await navigator.mediaDevices.getUserMedia(config)
  }

  const createNewCall = async () => {
    if (!newRoom) {
      try {
      const stream = await openMediaDevices({ video: false, audio: false })
      const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
      const peerConnection = new RTCPeerConnection(configuration);
      console.log(peerConnection, 'peer');
      stream.getTracks().forEach((track)=> {
        peerConnection.addTrack(track, stream);
      })
      const offer = await peerConnection.createOffer()
      socket.current.emit('create-new-room', { user: user, offer})
      peerConnection.setLocalDescription(offer)
      console.log(offer, 'offere');
      
      } catch (error) {
        console.log(error);
        alert(error)
      }

    }
  }


  return (
    <div className="min-h-screen relative">
      <Header page={'allClass'} />
      <div className="flex h-[85vh] flex-col-reverse justify-center gap-3 md:flex-row items-center md:px-20">
        {tab === 'home' ? (
          <>
            <div className="md:w-1/2">
              <h3 className="xl:text-7xl text-center text-2xl md:text-start font-bold text-textColor md:flex md:flex-col md:gap-5 tracking-wider">
                <span>Video</span>
                <span>Conferencing</span>
              </h3>
              <div className="flex flex-col text-center md:flex-row  gap-5 mt-10">
                <div className="">
                  <p className="text-gray-400 text-sm text-center mb-1">
                    create new meetup
                  </p>
                  <button className="btn m-auto mt-3 overflow-hidden bg-gradient-to-r from-lightPrimary to-primary text-white rounded-md flex gap-3 items-center uppercase" onClick={createNewCall}>
                    <i className="ri-add-fill"></i>
                    <span>create</span>
                  </button>
                </div>
                <div className="">
                  <p className="text-gray-400 text-sm mb-1">
                    to join a class meetup
                  </p>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-2 m-auto mt-2 tracking-wider focus:border-primary focus:shadow focus:shadow-primary outline-none font-bold text-primary  text-center p-3 rounded-md"
                    placeholder="enter the code"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src={bg} alt="meet up" className='max-w-[250px] xl:max-w-[500px]'/>
            </div>
          </>
        ) : (
          <>
            <WaitingPlace />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
