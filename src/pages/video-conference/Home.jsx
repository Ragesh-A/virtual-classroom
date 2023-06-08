import { useState } from 'react';
import bg from '../../assets/images/video-conference.png';
import Header from '../../components/classroom/header/Header';
import WaitingPlace from '../../components/video-conference/WaitingPlace';

const Home = () => {
  const [tab, setTab] = useState();
  return (
    <div className="min-h-screen relative">
      <Header page={'allClass'} />
      <div className="flex h-[85vh] items-center md:px-20">
        {tab === 'home' ? (
          <>
            <div className="w-1/2">
              <h3 className="md:text-7xl font-bold text-textColor md:flex md:flex-col md:gap-5 tracking-wider">
                <span>Video</span>
                <span>Conferencing</span>
              </h3>
              <div className="flex gap-5 mt-10">
                <div className="">
                  <p className="text-gray-400 text-sm text-center mb-1">
                    create new meetup
                  </p>
                  <button className="btn overflow-hidden bg-gradient-to-r from-lightPrimary to-primary text-white rounded-md flex gap-3 items-center uppercase">
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
                    className="border-2 tracking-wider focus:border-primary focus:shadow focus:shadow-primary outline-none font-bold text-primary  text-center p-3 rounded-md"
                    placeholder="enter the code"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <img src={bg} alt="meet up" />
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
