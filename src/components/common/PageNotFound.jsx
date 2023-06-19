import React, { useEffect, useState } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import background from '../../assets/images/page-found.jpg';
import Header from '../classroom/header/Header';

const PageNotFound = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  let interval;
  const error = useRouteError()

  useEffect(() => {
    interval = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate(-1);
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className='h-screen flex flex-col'>
    <Header page='allClass' />
    <div className="flex p-3 justify-center items-center flex-col text-gray-400 flex-grow text-center">
      <img draggable="false" src={background} alt="page not found" className=' max-w-[300px] xl:max-w-[400px]' />
      <p>{error}</p>
      <p className="font-bold md:text-3xl mt-3 text-center">
        It seems like you've taken a wrong turn. Don't worry.
      </p>
      <p>We take care of it.</p>
      <p>Page will redirect to home within <span className='text-primary font-bold'>{count}</span> seconds.</p>
    </div>
    </div>
  );
};

export default PageNotFound;
