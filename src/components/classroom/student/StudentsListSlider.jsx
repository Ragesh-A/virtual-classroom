import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StudentListSlider = () => {

  const { currentClass } = useSelector(store=>store.classes)
  const [active, setActive] = useState(true)

  const students = currentClass?.students
  const { peopleSlide } = useSelector(store=>store.ui)
  useEffect(()=>{
    setActive(active ? false : true)
  }, [peopleSlide])

  return (
    <div className={`fixed z-[3] ${active ? 'right-0' : 'right-[-100%]'} transitions w-80 max-w-full bg-tileColor h-full border-2 border-white shadow rounded-s-md p-5`}>
      <div className="rounded py-2 px-3 border-2 border-white shadow-inner shadow-slate-300 bg-slate-100 flex items-center gap-2">
        <i className="fa-solid fa-magnifying-glass text-textColor"></i>
        <input type="text" name="name" id="name" className="w-full outline-none bg-transparent"/>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="p-1 border-2 border-transparent border-b-white">Ajul</li>
        <li className="p-1 border-2 border-transparent border-b-white">Junaid</li>
       {students && students.map(student=>(
        <li className="p-1 border-2 border-transparent border-b-gray-500" key={student?._id}>{student?.name}</li>
       ))}
      </ul>
    </div>
  )
};

export default StudentListSlider;