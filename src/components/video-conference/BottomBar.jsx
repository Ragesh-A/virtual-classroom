import { useState } from 'react';

const BottomBar = ({setSlider}) => {
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [boardActive, setBoardActive] = useState(false);
  const [handActive, setHandActive] = useState(false);
  const [screenActive, setScreenActive] = useState(false);
  const [messageActive, setMessageActive] = useState(false);
  return (
    <div className="bg-tileColor p-3 rounded-md flex justify-center border-2 border-white shadow">
      <div className="">
        <ul className="flex gap-2 md:gap-5">
          <li>
            <button
              className="bg-tileColor rounded-full h-10 w-10 md:w-14 md:h-14 shadow border-2 border-white"
              onClick={() => setMicActive(micActive ? false : true)}
            >
              {micActive ? (
                <i className="ri-mic-fill text-red-500 text-sm md:text-2xl"></i>
              ) : (
                <i className="ri-mic-off-fill text-blue-900  md:text-2xl"></i>
              )}
            </button>
          </li>
          <li>
            <button
              className="bg-tileColor rounded-full w-10 md:w-14 h-10 md:h-14 shadow border-2 border-white"
              onClick={() => setCameraActive(cameraActive ? false : true)}
            >
              {cameraActive ? (
                <i className="ri-camera-fill text-red-500 text-2xl"></i>
              ) : (
                <i className="ri-camera-off-fill text-blue-900  md:text-2xl"></i>
              )}
            </button>
          </li>
          <li>
            <button
              className="bg-tileColor rounded-full w-10 md:w-14 h-10 md:h-14 shadow border-2 border-white"
              onClick={() => setBoardActive(boardActive ? false : true)}
            >
              {boardActive ? (
                <i className="ri-artboard-fill md:text-2xl text-red-500"></i>
              ) : (
                <i className="ri-artboard-fill md:text-2xl text-blue-900"></i>
              )}
            </button>
          </li>
          <li>
            <button
              className="bg-tileColor rounded-full w-10 md:w-14 h-10 md:h-14 shadow border-2 border-white"
              onClick={() => setHandActive(handActive ? false : true)}
            >
              {handActive ? (
                <i className="fa-solid fa-hand md:text-2xl text-red-500"></i>
              ) : (
                <i className="fa-solid fa-hand md:text-2xl text-blue-900"></i>
              )}
            </button>
          </li>
          <li>
            <button
              className="bg-tileColor rounded-full w-10 md:w-14 h-10 md:h-14 shadow border-2 border-white"
              onClick={() => setScreenActive(screenActive ? false : true)}
            >
              {screenActive ? (
                <i className="ri-cast-fill md:text-2xl text-red-500"></i>
              ) : (
                <i className="ri-cast-fill md:text-2xl text-blue-900"></i>
              )}
            </button>
          </li>
          <li>
            <button
              className="bg-tileColor rounded-full w-10 md:w-14 h-10 md:h-14 shadow border-2 border-white"
              onClick={() => {
                setSlider()
                return setMessageActive(messageActive ? false : true)}}
            >
              {messageActive ? (
                <i className="ri-chat-4-fill md:text-2xl text-red-500"></i>
              ) : (
                <i className="ri-chat-off-fill md:text-2xl text-blue-900"></i>
              )}
            </button>
          </li>
          <li>
            <button className="bg-tileColor rounded-full w-10 md:w-14 h-10  md:h-14 shadow border-2 border-white">
              <i className="fa-solid fa-phone-slash md:text-2xl text-red-500"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomBar;
