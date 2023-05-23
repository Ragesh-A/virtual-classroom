import { Link } from 'react-router-dom';
import img from '../../assets/images/person.png';

const ClassCard = ({ to, classes = [] }) => {
  return (
    <>
      {classes.map(singleClass => (
        <Link to={'/class/' + singleClass?._id} className="h-72" key={singleClass._id}>
          <div className="class-card overflow-hidden shadow shadow-shadow max-w-[500px] h-full relative">
            <div></div>
            <div className="px-5 py-1 relative">
              <img
                src={img}
                alt=""
                className="absolute right-8 top-[-1rem] w-[80px] h-[80px]" />
              <p className="font-bold text-textColor">{singleClass?.name}</p>
              <p className="mt-2 text-sm text-textColor">
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
