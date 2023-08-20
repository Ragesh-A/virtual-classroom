import { useContext, useEffect, useRef, useState } from 'react';
import BottomBar from '../../components/video-conference/BottomBar';
import UserBox from '../../components/video-conference/UserBox';
import UserList from '../../components/video-conference/UserList';
import Chat from './Chat';
import Notification from '../../components/common/Notification';
import { useSelector } from 'react-redux';
import { MeetupContext } from './MeetUp';
import Shimmer from '../../components/common/Shimmer';
import Settings from './Settings';
import { iceServers } from '../../constant/constant';
import webRTCHelper from '../../utils/webRTCHelper';
import { useParams } from 'react-router-dom';

//helper
const constraints = {
	audio: true,
	video: true,
};

const VideoConference = () => {
	const { socket, isCreator } = useContext(MeetupContext);
	const { user } = useSelector((store) => store.user);
	const [localStream, setLocalStream] = useState(null);
	const [remoteStreams, setRemoteStreams] = useState([]);
	const [isSliderActive, setIsSliderActive] = useState(false);
	const [settingsActive, setSettingsActive] = useState(false);

	const RTCP = useRef();
	const { meetupId } = useParams();

	useEffect(() => {
		console.log('i am local: ', localStream);
		console.log('i am remote: ', remoteStreams);
	}, [localStream, remoteStreams]);

	//faking
	const users = new Array(1).fill('users');
	if (users.length > 15) {
		users.length = 15;
	}

	const sliderHandle = () => {
		setIsSliderActive((prev) => !prev);
	};

	useEffect(() => {
		if (!socket) return;
		RTCP.current = new RTCPeerConnection(constraints);
		RTCP.current.onicecandidate = onIceCandidate;
		RTCP.current.ontrack = OnTrack;

		function OnTrack(e) {
			console.log('ontrack', e);
			if (e && e.streams.length) {
				console.log('remote streamsss', e.streams);
				setRemoteStreams(e.streams);
			}
		}

		function onIceCandidate(e) {
			if (e && e.candidate) {
				socket.emit('candidate', e.candidate, meetupId);
			}
		}
	}, [meetupId, socket]);

	useEffect(() => {
		if (!socket || !meetupId) return;

		const streamMeta = webRTCHelper.openMediaDevices(constraints);
		streamMeta.then((stream) => {
			setLocalStream(stream);
			socket.emit('ready', meetupId);
		});
	}, [socket, meetupId]);

	useEffect(() => {
		if (!socket || !meetupId || !localStream) return;

		socket.on('ready', () => {
			console.log(isCreator);
			if (isCreator) {
				console.log('iam ready');
				const newRTC = new RTCPeerConnection(constraints);
				newRTC.onicecandidate = onIceCandidate;
				newRTC.ontrack = OnTrack;
				RTCP.current = newRTC;
				// if (RTCP.current.getSenders().length === 0) {
				localStream.getTracks().forEach((track) => {
					RTCP.current.addTrack(track, localStream);
				});
				// }
				RTCP.current.createOffer(setOffer, errorHandle);
			} else {
				RTCP.current = null;
			}
		});

		socket.on('offer', async (offer) => {
			if (!isCreator) {
				const newRTC = new RTCPeerConnection(constraints);
				newRTC.onicecandidate = onIceCandidate;
				newRTC.ontrack = OnTrack;
				RTCP.current = newRTC;
				// if (RTCP.current.getSenders().length === 0) {
				localStream.getTracks().forEach((track) => {
					RTCP.current.addTrack(track, localStream);
				});
				// }
				if (RTCP.current.signalingState === 'stable') {
					await RTCP.current.setRemoteDescription(offer);
				}

				if (!RTCP.current.isStable) {
					await RTCP.current.setRemoteDescription(offer);
			}

				RTCP.current.createAnswer(handleAnswer, errorHandle);
			}
		});

		socket.on('candidate', (candidate) => {
			const iceCandidate = new RTCIceCandidate(candidate);
			RTCP.current.addIceCandidate(iceCandidate).catch(errorHandle);
		});

		socket.on('answer', async (answer) => {
			console.log('yes i got the answer', answer);
			console.log(RTCP.current);
			try {
        if (RTCP.current) {
            await RTCP.current.setRemoteDescription(answer);
        } else {
            console.log('No active RTCPeerConnection to set remote description.');
        }
    } catch (error) {
        console.error('Error setting remote description:', error);
    }
		});

		function OnTrack(e) {
			console.log('ontrack', e);
			if (e && e.streams.length) {
				console.log('remote streamsss', e.streams);
				setRemoteStreams(e.streams);
			}
		}

		function onIceCandidate(e) {
			if (e && e.candidate) {
				socket.emit('candidate', e.candidate, meetupId);
			}
		}

		function errorHandle(error) {
			alert('error');
			console.log('error:', error);
		}

		function setOffer(offer) {
			console.log('got offer:', offer);
			RTCP.current.setLocalDescription(offer);
			socket.emit('offer', offer, meetupId);
		}

		async function handleAnswer(answer) {
			console.log('got answer: ', answer);
			await RTCP.current.setLocalDescription(answer);
			socket.emit('answer', answer, meetupId);
		}
	}, [isCreator, localStream, meetupId, socket]);

	if (!socket && !socket?.connected) {
		return <Shimmer />;
	}

	return (
		<>
			<div className='flex h-screen p-1 md:p-5 relative'>
				<div className='flex flex-col justify-between w-full md:flex-row-reverse overflow-hidden'>
					<div className='flex-grow flex flex-col justify-between ps-3 md:pt-5 md:ps-0 py-3 pe-3'>
						<Notification />
						
							<div
								className={`grid ${
									users.length > 8
										? 'video-conference'
										: `md:grid-cols-${ remoteStreams.length + 1}`
								} gap-2 pb-3 `}
							>
								<UserBox
									name={`${user?.name}`}
									css={'h-[14rem] md:min-h-[10rem] md:h-full'}
									stream={localStream}
								/>
								{remoteStreams &&
									remoteStreams.map((singleStream) => (
										<UserBox
											key={singleStream?.id}
											name={`${user?.name}`}
											css={'h-[14rem] md:min-h-[10rem] md:h-full'}
											stream={singleStream}
										/>
									))}
								{/* {users.map((user, index) => (
									<UserBox
										key={index + users}
										name={`${index}`}
										css={'h-[14rem] md:min-h-[10rem] md:h-full'}
									/>
								))} */}
							</div>

						<BottomBar
							setSlider={sliderHandle}
							// isPermissionAccessed={isPermissionAccessed}
						/>
					</div>
					<UserList setSettingsActive={setSettingsActive} />
				</div>
				{isSliderActive && <Chat />}
				<Settings
					isActive={settingsActive}
					close={() => setSettingsActive(false)}
				/>
			</div>
		</>
	);
};

export default VideoConference;
