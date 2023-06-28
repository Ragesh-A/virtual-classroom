import { Link } from 'react-router-dom';
import defaultUser from '../../../assets/images/defaultUserProfile.png';
import defaultBg from '../../../assets/images/bg.webp';
import { IMAGE_PATH } from '../../../constant/constant';

const ClassCard = ({ classes = [] }) => {
return (
<>
  {(
  classes.map((singleClass) => (
  <div key={singleClass._id} className='h-72 '>
    {singleClass.isBlocked ? (
    <div
      className="overflow-hidden shadow shadow-shadow shim relative hover:before:absolute hover:before:rotate-[-45deg] hover:before:px-[2rem] hover:before:py-[3px] hover:before:font-bold hover:before:text-white hover:before:shim hover:before:left-[-2rem] hover:before:top-[1rem] hover:before:bg-red-500 hover:before:z-[2] hover:before:content-['BLOCKED'] h-full">
      <div className="flex h-3/5">
        <img draggable='false' src={ (singleClass.image && `${IMAGE_PATH}/classroom/${singleClass.image}`) || defaultBg } alt="background"
          className="w-full -full" />
      </div>
      <div
        className="px-5 py-1 relative before:absolute before:content-[''] before:w-[150%] before:h-[5rem] before:-top-4 before:-left-4 before:rotate-3 md:before:rotate-6 before:bg-white ">
        <img draggable='false' src={singleClass?.createdBy?.avatar || defaultUser} alt="avatar"
          className="absolute right-8 top-[-3rem] rounded w-[80px] h-[80px] border-2 border-white " />
        <p className="font-bold text-textColor relative">
          {singleClass?.name}
        </p>
        <p className="mt-2 text-sm text-textColor relative">
          {singleClass?.description}
        </p>
      </div>
    </div>

    ) : (

    <Link to={`/class/${singleClass?._id}/`} className="h-72" >
    <div className="overflow-hidden shadow shadow-shadow max-w-[500px] h-full relative">
      <div className="flex h-3/5">
        <img draggable='false' src={ (singleClass.image && `${IMAGE_PATH}/classroom/${singleClass.image}`) || defaultBg } alt="background"
          className="w-full -full" />
      </div>
      <div className="px-5 py-1 relative before:absolute before:content-[''] before:w-[150%] before:h-[5rem] before:-top-4 before:-left-4 before:rotate-3 md:before:rotate-6 before:bg-white ">
        <img draggable='false' src={(singleClass?.createdBy?.avatar && `${IMAGE_PATH}profiles/${singleClass?.createdBy?.avatar}`) || defaultUser} alt="avatar" className="absolute right-8 top-[-3rem] rounded w-[80px] h-[80px] border-2 border-white bg-white" />
        <p className="font-bold text-textColor relative">
          {singleClass?.name}
        </p>
        <p className="mt-2 text-sm text-textColor relative">
          {singleClass?.description}
        </p>
      </div>
    </div>
    </Link>

    )}
  </div>
  ))
  )}
</>
);
};

export default ClassCard;