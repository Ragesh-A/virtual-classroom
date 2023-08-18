import { useNavigate } from 'react-router';
import bg from '../assets/images/maintenance.gif';

const Maintenance = () => {
	const navigate = useNavigate();
	return (
		<section className='flex justify-center items-center flex-col'>
			<h2 className='text-primary uppercase text-3xl font-bold underline mb-5'>
				Maintenance
			</h2>
			<div className='max-w-sm'>
				<img src={bg} alt='maintenance' />
			</div>
			<p className='max-w-[550px] text-xl text-center my-5'>
				Our website is currently undergoing scheduled maintenance to bring you
				even better features and performance. We apologize for any inconvenience
				this may cause and appreciate your patience.
			</p>
			<p>
				for more info:{' '}
				<span className='text-primary'>virtualclassroom.assist@gmail.com</span>
			</p>
      <button
        onClick={()=>navigate(-1)}
        className='bg-primary text-white px-5 py-2 rounded-full mt-5 uppercase'>go back</button>
		</section>
	);
};

export default Maintenance;
