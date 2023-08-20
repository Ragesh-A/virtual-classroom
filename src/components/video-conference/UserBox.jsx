import { useEffect, useRef } from 'react';
import Avatar from '../common/Avatar';

const UserBox = ({ css, name = 'q', stream }) => {
	const videRef  = useRef();
	useEffect(() => {
		if (videRef.current) {
			videRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<div
			className={`bg-tileColor overflow-hidden rounded-md min-w-[5em] min-h-[5rem] flex justify-center items-center relative ${css}`}
		>
			{!stream ? (
				<>
					<Avatar name={name} />
					<div className='absolute top-[7px] right-[9px] text-gray-700'>
						{true ? (
							<i className='ri-mic-fill'></i>
						) : (
							<i className='ri-mic-off-fill'></i>
						)}
					</div>
					<span className='absolute bottom-2 left-3 bg-black px-3 min-w-[5rem] text-center py-1 text-white rounded-md bg-opacity-30 uppercase'>
						{name}
					</span>
				</>
			) : (
				<div className='flex-grow'>
					<video
						autoPlay
						muted
						ref={videRef }
						className='w-full object-cover'
					/>
				</div>
			)}
		</div>
	);
};

export default UserBox;
