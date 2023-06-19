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
    <ul className="flex justify-around items-center w-full">
      <NavLink
        to="/"
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
      >
        <i className="ri-home-2-fill lg:hidden text-xl"></i>
        <li className="hidden lg:block">My class</li>
      </NavLink>
      <NavLink
        to={`/class/${classId}/`}
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
      >
        <i className="ri-discuss-fill lg:hidden text-xl"></i>
        <li className="hidden lg:block">Discussion panel</li>
      </NavLink>
      {!isLecture && (
        <NavLink
          to={`/class/${classId}/works/`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-calendar-todo-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Class work</li>
        </NavLink>
      )}

      {isLecture && (
        <NavLink
          to={`/class/${classId}/dashboard`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-dashboard-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Dashboard</li>
        </NavLink>
      )}
      {currentClass && currentClass?.class?.subscription && (
        <NavLink
          to={`/class/${classId}/chat-mate/`}
          className="border-4 border-transparent  hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-chat-private-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Chat</li>
        </NavLink>
      )}
      {isLecture && (
        <NavLink
          to={`/meetup`}
          className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        >
          <i className="ri-vidicon-fill lg:hidden text-xl"></i>
          <li className="hidden lg:block">Meet up</li>
        </NavLink>
      )}
      <button
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav"
        onClick={handleSlide}
      >
        <i className="ri-team-fill lg:hidden text-xl"></i>
        <li className="hidden lg:block">People</li>
      </button>
    </ul>
  );
};

export default SingleClassHeaderComponent;
