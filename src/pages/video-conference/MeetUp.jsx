import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MEETUP_SOCKET_IP } from '../../constant/constant';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';
export const MeetupContext = createContext();

const MeetUp = () => {
	const [socket, setSocket] = useState(null);
	const [isCreator, setIsCreator] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!socket) {
			const newSocket = io(MEETUP_SOCKET_IP);
			setSocket(newSocket);
		}

		if (socket) {
			socket.on('error', (message) => {
				dispatch(setNotification({ success: false, message }));
				navigate(-1);
			});
		}

		return () => {
			// setSocket(null)
			setIsCreator(false);
		};
  }, [dispatch, navigate, socket]);
  
  useEffect(() => {

  }, [])

	return (
		<MeetupContext.Provider value={{ socket, isCreator, setIsCreator }}>
			<Outlet />
		</MeetupContext.Provider>
	);
};

export default MeetUp;
