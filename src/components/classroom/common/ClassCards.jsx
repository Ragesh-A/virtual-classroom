import { Link } from 'react-router-dom';
import defaultUser from '../../../assets/images/defaultUserProfile.png';
import defaultBg from '../../../assets/images/bg.webp'
import { IMAGE_PATH } from '../../../constant/constant';

const ClassCard = ({ to, classes = [] }) => {
  return (
    <>
      {classes.length === 0 ?

       <div className='h-1/2 grid place-items-center w-full bg-red-500'>
            didn't join any class yet create now
        </div>
       
       :classes.map(singleClass => (
        <Link to={'/class/' + singleClass?._id} className="h-72" key={singleClass._id}>
          <div className="overflow-hidden shadow shadow-shadow max-w-[500px] h-full relative">
            <div className='flex h-3/5'>
            <img src={(singleClass.image && `${IMAGE_PATH}/classroom/${singleClass.image}`) || defaultBg}  alt='background' className='w-full -full'/>
            </div>
            <div className="px-5 py-1 relative before:absolute before:content-[''] before:w-[150%] before:h-[5rem] before:-top-4 before:-left-4 before:rotate-3 md:before:rotate-6 before:bg-white ">
              <img
                src={singleClass?.createdBy?.avatar||defaultUser}
                alt="avatar"
                className="absolute right-8 top-[-3rem] rounded w-[80px] h-[80px] border-2 border-white " />
              <p className="font-bold text-textColor relative">{singleClass?.name}</p>
              <p className="mt-2 text-sm text-textColor relative">
                {singleClass?.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ClassCard;
