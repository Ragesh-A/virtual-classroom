const iceServers = {
	iceServers: [
		{ urls: 'stun:stun.services.mozilla.com' },
		{ urls: 'stun:stun.l.google.com:19302' },
	],
};

const openMediaDevices = async (constraints) => {
	navigator.mediaDevices.getUserMedia =
		navigator.mediaDevices.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia;
	return await navigator.mediaDevices.getUserMedia(constraints);
};

const streamVideo = (stream, socket, roomId) => {
	socket.emit('ready', roomId);
};

const initializeWebRTC = (
	socket,
	isCreator,
	meetupId,
	setLocalStream,
	localStream,
	remoteStreams,
	setRemoteStream,
	user,
	errorHandler
) => {
	if (
		!socket ||
	
		!meetupId ||
		!setLocalStream ||
		!localStream ||
		!remoteStreams ||
		!setRemoteStream ||
		!user ||
		!errorHandler
		) {
			return;
	}
	
	let rtcPeerConnection;

	socket.on('ready', () => {
		if (isCreator) {
			console.log('ready');
			rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate
    rtcPeerConnection.ontrack = onTrack
    localStream.getTracks().forEach(track => {
      rtcPeerConnection.addTrack(track, localStream)
    })
    rtcPeerConnection.createOffer( sendOffer, errorHandler )
		}
	});

	console.log(rtcPeerConnection);

	socket.on('candidate', (candidate) => {
		console.log(candidate, 'candidate');
  const iceCandidate = new RTCIceCandidate(candidate)
  console.log('ice candidate', iceCandidate);
  console.log('ice rtcpeerconnectiion', rtcPeerConnection);
  rtcPeerConnection.addIceCandidate(iceCandidate).catch((err) => {
    console.log('fuck ', err);
  })
	});

	socket.on('offer', (offer) => {
		console.log('i got offer', offer);
		if (!isCreator) {
			rtcPeerConnection = new RTCPeerConnection(iceServers);
			rtcPeerConnection.onicecandidate = onIceCandidate;
			rtcPeerConnection.ontrack = onTrack;
			localStream.getTracks().forEach((track) => {
				rtcPeerConnection.addTrack(track, localStream);
			});
			rtcPeerConnection.setRemoteDescription(offer);
			rtcPeerConnection.createAnswer(sendAnswer, errorHandler);
		}
	});

	socket.on('answer', (answer) => {
		console.log('i got the answer', answer);
		rtcPeerConnection.setRemoteDescription(answer);
	});

	socket.on('new-joiner', (user) => {
		// console.log('new user joined', user);
	});

	// helpers
	function onIceCandidate(e) {
		console.log('yes candidate', e.candidate);
		if (e && e.candidate) {
			socket.emit('candidate', e.candidate, meetupId);
		}
	}

	function onTrack(e) {
		console.log(e, 'streams');
		if (e && e.streams.length) {
			console.log(e.stream, "ontack reamote sream");
			setRemoteStream(e.streams[0]);
		}
	}

	function sendOffer(offer) {
		rtcPeerConnection.setLocalDescription(offer);
		socket.emit('offer', offer, meetupId);
	}

	function sendAnswer(answer) {
		rtcPeerConnection.setLocalDescription(answer);
		socket.emit('answer', answer, meetupId);
	}
};

const webRTCHelper = {
	iceServers,
	openMediaDevices,
	streamVideo,
	initializeWebRTC,
};

export default webRTCHelper;
