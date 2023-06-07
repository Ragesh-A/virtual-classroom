import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Shimmer from '../../common/Shimmer';

const StudentListSlider = () => {
  const { currentClass } = useSelector((store) => store.classes);
  const [active, setActive] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState(currentClass?.students);

  useEffect(()=>{
    setFilteredUsers(currentClass?.students)
  }, [currentClass])

  const filterUser = (e) => {
    const search = e.target.value;
    const filtered = currentClass.students.filter((student) => {
      return student.name.includes(search);
    });
    setFilteredUsers(filtered);
  };
  

  const { peopleSlide } = useSelector((store) => store.ui);
  useEffect(() => {
    setActive(active ? false : true);
  }, [peopleSlide]);

  return (
    <div
      className={`fixed z-[3] ${
        active ? 'right-0' : 'right-[-100%]'
      } transitions w-80 max-w-full bg-tileColor h-full border-2 border-white shadow rounded-s-md p-5`}
    >
      {filteredUsers ? (
        <>
          <div className="rounded py-2 px-3 border-2 border-white shadow-inner shadow-slate-300 bg-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-textColor"></i>
            <input type="text" name="name" id="name" className="w-full outline-none bg-transparent" onChange={filterUser}/>
          </div>
          <ul className="flex flex-col gap-2">
            {filteredUsers &&
              filteredUsers.map((student) => (
                <li className="p-1 border-2 border-transparent border-b-white" key={student?._id}>
                  {student?.name}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <Shimmer count={3}/>
      )}
    </div>
  );
};

export default StudentListSlider;
