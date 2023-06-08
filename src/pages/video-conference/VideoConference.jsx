import { useEffect, useState } from 'react';
import BottomBar from '../../components/video-conference/BottomBar';
import UserBox from '../../components/video-conference/UserBox';
import UserList from '../../components/video-conference/UserList';
import Chat from './Chat';

const VideoConference = () => {
  const users = new Array(18).fill('users');
  if (users.length > 15){
    users.length = 15
  }
  const [count, setCount ] = useState()
  const [slider, setSlider] = useState()
  const sliderHandle = () => {setSlider(slider ? false: true)}

  useEffect(()=> {
    setCount((Math.ceil((users.length)/2)) % 12)
  }, [users])
  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-between w-full md:flex-row-reverse h-screen overflow-hidden">
          <div className="w-full h-[90%]  md:h-screen flex flex-col justify-between ps-3 md:pt-5 md:ps-0 py-3 pe-3">
            {count && <div className={`grid ${users.length > 8 ? 'video-conference' : `md:grid-cols-${users.length === 2 ? 2 : count}`} gap-2 pb-3 md:h-full `}>
              {users.map((user, index) => (
                <UserBox
                  key={index + users}
                  name={`${index}`}
                  css={'h-[14rem] md:min-h-[10rem] md:h-full'}
                />
              ))}
            </div>}
            <BottomBar setSlider={sliderHandle}/>
          </div>
          <UserList />
        </div>
        {slider && <Chat />}
      </div>
    </>
  );
};

export default VideoConference;
