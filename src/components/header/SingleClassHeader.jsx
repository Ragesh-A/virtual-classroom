import { NavLink, useParams } from 'react-router-dom';

const SingleClassHeaderComponent = () => {

  const {classId} = useParams();
  const lecture = false;

return (
    <ul className="flex items-center">
      <NavLink to={`/class/${classId}`}
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav">
        <i className="fa-solid fa-people-roof sm:hidden"></i>
        <li className="hidden sm:block">Discussion panel</li>
      </NavLink>
      <NavLink to={`/class/${classId}/class-work`}
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav">
        <i className="fa-solid fa-video sm:hidden"></i>
        <li className="hidden sm:block">Class work</li>
      </NavLink>
      <button
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav">
        <i className="fa-solid fa-video sm:hidden"></i>
        <li className="hidden sm:block">Peoples</li>
      </button>
      { lecture && <NavLink to={`/class/${classId}/dashboard`}
        className="border-4 border-transparent hover:border-t-white text-white font-bold p-[15px] me-1 nav">
        <i className="fa-solid fa-user-shield sm:hidden"></i>
        <li className="hidden sm:block">Dashboard</li>
      </NavLink>}
    </ul>
);
};

export default SingleClassHeaderComponent;