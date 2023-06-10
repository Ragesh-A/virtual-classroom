import { useEffect, useRef, useState } from 'react';
import BottomBar from '../../components/video-conference/BottomBar';
import UserBox from '../../components/video-conference/UserBox';
import UserList from '../../components/video-conference/UserList';
import Chat from './Chat';
import Notification from '../../components/common/Notification'
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const VideoConference = () => {
  const users = new Array(1).fill('users');
  if (users.length > 15) {
    users.length = 15;
  }
  const [count, setCount] = useState();
  const [slider, setSlider] = useState();
  const [localStream, setLocalStream] = useState();
  const localVideo = useRef();

  // error handle
  const dispatch = useDispatch()
  
 
  const sliderHandle = () => {
    setSlider(slider ? false : true);
  };


  useEffect(() => {
    setCount(Math.ceil(users.length / 2 + 1) % 12);
  }, [users]);

  //local stream permission
  const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  console.log('hdh');

  useEffect(() => {
    const initStream = async () => {
      try {
        const constraints = { video: false, audio: false };
        const stream = await openMediaDevices(constraints);
        setLocalStream(stream);
        dispatch(setNotification({ success: true, message: 'permission granted'}))
      } catch (error) {
        dispatch(setNotification({ success: false, message: error.message}))
      }
    };

    initStream();
    return ()=>{
      setLocalStream(false);
    }
  }, [localVideo.current]);
  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-between w-full md:flex-row-reverse h-screen overflow-hidden">
          <div className="w-full h-[90%]  md:h-screen flex flex-col justify-between ps-3 md:pt-5 md:ps-0 py-3 pe-3">
            <Notification />
            {count && (
              <div
                className={`grid ${
                  users.length > 8
                    ? 'video-conference'
                    : `md:grid-cols-${users.length === 2 ? 2 : count}`
                } gap-2 pb-3 md:h-full `}
              >
                <UserBox
                  name={`${'ragesh'}`}
                  css={'h-[14rem] md:min-h-[10rem] md:h-full'}
                  stream={localStream}
                  refe={localVideo}
                />
                {users.map((user, index) => (
                  <UserBox
                    key={index + users}
                    name={`${index}`}
                    css={'h-[14rem] md:min-h-[10rem] md:h-full'}
                  />
                ))}
              </div>
            )}
            <BottomBar setSlider={sliderHandle} />
          </div>
          <UserList />
        </div>
        {slider && <Chat />}
      </div>
    </>
  );
};

export default VideoConference;
