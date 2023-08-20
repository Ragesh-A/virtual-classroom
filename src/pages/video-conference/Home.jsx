import React, { useContext, useState } from 'react';
import bg from '../../assets/images/video-conference.png';
import Header from '../../components/classroom/header/Header';
import WaitingPlace from '../../components/video-conference/WaitingPlace';
import { v4 as uuid } from 'uuid';

import { useNavigate } from 'react-router-dom';
import { MeetupContext } from './MeetUp';
import Notification from '../../components/common/Notification';

const Home = () => {
	const [tab, setTab] = useState('home');
	const { socket, setIsCreator } = useContext(MeetupContext);

	const [roomCode, setRoomCode] = useState('');

	const navigate = useNavigate();
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const roomId = roomCode.trim();
		if (roomId) {
			setTab('waiting');
		}
	};

	const createNewCall = async () => {
		const id = uuid();
		socket.emit('create', id);
		socket.on('created', (data) => {
			if (data?.success) {
				setIsCreator(true);
				navigate(`/meetup/${id}`);
			}
		});
	};

	return (
		<div className='min-h-screen relative'>
			<Notification />
			<Header page={'allClass'} />
			<div
				className='flex h-[85vh] flex-col-reverse
       justify-center gap-3 md:flex-row items-center md:px-20'
			>
				{tab === 'home' ? (
					<>
						<div className='md:w-1/2'>
							<h3
								className='xl:text-7xl text-center
               text-2xl lg:text-start font-bold text-textColor
                md:flex md:flex-col lg:gap-5 lg:tracking-wider'
							>
								<span>Video</span>
								<span>Conferencing</span>
							</h3>
							<div
								className='flex flex-col-reverse text-center 
              lg:flex-row  gap-5 mt-10'
							>
								<div className=''>
									<p
										className='text-gray-400 text-sm 
                  text-center mb-1'
									>
										Create new meetup
									</p>
									<button
										className='btn m-auto mt-3 overflow-hidden 
                    bg-gradient-to-r from-lightPrimary to-primary
                     text-white rounded-md flex gap-3 items-center uppercase
                     p-2 px-5 w-full justify-center'
										onClick={createNewCall}
									>
										<i className='ri-add-fill'></i>
										<span>create</span>
									</button>
								</div>
								<div className=''>
									<p className='text-gray-400 text-sm mb-1'>
										To join a class meetup
									</p>
									<form
										onSubmit={handleFormSubmit}
										className='border-2 flex items-center rounded-full overflow-hidden'
									>
										<input
											type='text'
											name=''
											id=''
											value={roomCode}
											onChange={(e) => setRoomCode(e.target.value)}
											className=' m-auto  tracking-wider focus:border-primary
                       focus:shadow focus:shadow-primary outline-none 
                       font-bold text-primary  text-center p-3 rounded-md'
											placeholder='enter the code'
										/>{' '}
										<button
											className='bg-primary text-white
                     w-[3rem] h-[3rem] rounded-full'
										>
											Join
										</button>
									</form>
								</div>
							</div>
						</div>
						<div className='md:w-1/2 flex justify-center'>
							<img
								draggable='false'
								src={bg}
								alt='meet up'
								className='max-w-[250px] xl:max-w-[500px]'
							/>
						</div>
					</>
				) : (
					<>
						<WaitingPlace roomCode={roomCode}/>
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
