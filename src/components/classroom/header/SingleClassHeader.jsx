import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { decodeUser } from '../../../utils/storageHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setPeopleSlide } from '../../../utils/store/uiSlice';

const SingleClassHeaderComponent = () => {
  const { classId } = useParams();
  const [isLecture, setIsLecture] = useState(false);
  const { currentClass } = useSelector((store) => store.classes);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = decodeUser();
    if (user._id === currentClass?.class?.instructor?._id) {
      setIsLecture(true);
    }
    return () => {
      setIsLecture(false);
    };
  }, [currentClass]);

  const handleSlide = () => {
    dispatch(setPeopleSlide());
  };

  return (
    <ul className="flex items-center">
      <NavLink
        to="/"
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
      >
        <i className="fa-solid fa-people-roof sm:hidden"></i>
        <li className="hidden sm:block">My class</li>
      </NavLink>
      <NavLink
        to={`/class/${classId}/`}
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
      >
        <i className="fa-solid fa-people-roof sm:hidden"></i>
        <li className="hidden sm:block">Discussion panel</li>
      </NavLink>
      {!isLecture && (
        <NavLink
          to={`/class/${classId}/works/`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-video sm:hidden"></i>
          <li className="hidden sm:block">Class work</li>
        </NavLink>
      )}

      {isLecture && (
        <NavLink
          to={`/class/${classId}/dashboard/`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-user-shield sm:hidden"></i>
          <li className="hidden sm:block">Dashboard</li>
        </NavLink>
      )}
      {currentClass && currentClass.class.subscription && (
        <NavLink
          to={`/class/${classId}/chat-mate/`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-user-shield sm:hidden"></i>
          <li className="hidden sm:block">Chat</li>
        </NavLink>
      )}
      {isLecture && (
        <NavLink
          to={`/meet`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="fa-solid fa-video sm:hidden"></i>
          <li className="hidden sm:block">Meet up</li>
        </NavLink>
      )}
      <button
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        onClick={handleSlide}
      >
        <i className="fa-solid fa-users-line sm:hidden"></i>
        <li className="hidden sm:block">People</li>
      </button>
    </ul>
  );
};

export default SingleClassHeaderComponent;
