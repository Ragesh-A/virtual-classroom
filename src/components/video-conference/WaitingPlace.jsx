import { useEffect, useRef, useState } from 'react';
import Avatar from '../common/Avatar';

const openMediaDevices = async (constraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

const WaitingPlace = () => {
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState();
  const videoInp = useRef();

  useEffect(() => {
    // if (videoInp.current){
      const initializeStream = async () => {
        try {
          const constraints = {
            audio: { echoCancellation: micActive },
            video: cameraActive
          };

          const stream = await openMediaDevices(constraints);
          console.log('called', videoInp.current);
          console.log('ted', cameraActive);
          if (videoInp.current) {
            videoInp.current.srcObject = stream;
          }
          setStream(stream);
        } catch (error) {
          console.log(error, 'error video');
        }
      };

      initializeStream();
    // }
      
    
  }, [cameraActive]);

  return (
    <>
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gradient-to-b from-pink-50 to-blue-50 border-[3px] rounded-md md:w-[70%] md:h-[20rem] border-white shadow flex justify-center items-center">
            {!cameraActive ? (
              <Avatar
                h="h-28"
                w="w-28 border-2"
                font={'text-2xl font-bold text-white'}
                name={'r'}
              />
            ) : (
              <video
                src=""
                playsInline
                className="w-full h-full"
                autoPlay={true}
                ref={videoInp}
                muted
              />
            )}
          </div>
          <div className="flex gap-5 mt-10 w-">
            <button
              className={`rounded-md px-5 py-3 border-[3px] ${
                cameraActive
                  ? 'border-[3px] border-primary text-primary'
                  : 'bg-gradient-to-b from-primary to-lightPrimary text-white border-white'
              }`}
              onClick={() => setCameraActive(cameraActive ? false : true)}
            >
              {cameraActive ? (
                <i className="ri-camera-fill text-lg"></i>
              ) : (
                <i className="ri-camera-off-fill text-lg"></i>
              )}
              <span className="ml-2">camera</span>
            </button>
            <button
              className={`rounded-md px-5 py-3 border-[3px] ${
                micActive
                  ? ' border-primary text-primary'
                  : 'bg-gradient-to-b from-primary to-lightPrimary text-white border-white'
              }`}
              onClick={() => setMicActive(micActive ? false : true)}
            >
              {micActive ? (
                <i className="ri-mic-fill text-lg"></i>
              ) : (
                <i className="ri-mic-off-fill"></i>
              )}
              <span className="ml-2">microphone</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <video src=""></video>
      </div>
    </>
  );
};

export default WaitingPlace;
