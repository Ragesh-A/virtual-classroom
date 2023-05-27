import { useEffect, useRef, useState } from 'react';
import Shimmer from '../common/Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import organizerServices from '../../services/organizerServices';
import { setClasses } from '../../utils/store/organizerSlice';
import { AnimatePresence, motion } from 'framer-motion';

const InstructorManagement = () => {
  const [fade, setFade] = useState();
  const [popUp, setPopUp] = useState(false);
  const [instructors, setInstructors] = useState(false)
  const message = useRef();
  const emailOrPhone = useRef();
  
  setTimeout(() => {
    setFade(true);
  }, 1000);
  
  
  useEffect(() => {
    organizerServices.getInstructors().then((res)=>{
      setInstructors(res?.success?.instructors);
    })
  }, []);

  const handleSubmit = (e) =>{
      e.preventDefault();
      organizerServices.sendInvitation(emailOrPhone.current.value, message.current.value).then(res=>{
        console.log(res)
      })
      setPopUp(false)
  }

  const handleRemove = (instructorId) =>{
    organizerServices.removeInstructor(instructorId).then(res=>{
      console.log(res)
    })
  }
  
  if (!instructors) {
  return (
<>
  <Shimmer />
  <Shimmer />
  <Shimmer />
</>
);
}

return (
<>
  <div className={`box p-5 rounded ${ !fade ? 'opacity-0' : 'opacity-100' } transitions`}>
    <p className="text-center text-primary underline font-extrabold text-xl mb-5">
      Instructor management
    </p>
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-white ">
            <span className="bg-lightPrimary block rounded p-2">#</span>
          </th>
          <th className="text-white ">
            <span className="bg-lightPrimary block rounded p-2">
              instructor name
            </span>
          </th>
          <th className="text-white ">
            <span className="bg-lightPrimary block rounded p-2">
              Contact
            </span>
          </th>
          <th className="text-white ">
            <span className="bg-lightPrimary block rounded p-2">
              Action
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="text-center">
        {instructors &&
        instructors?.map((instructor, index) => (
        <tr key={instructor?._id}>
          <td>
            <span className="py-2 bg-indigo-50 block rounded">
              {index + 1}
            </span>
          </td>
          <td>
            <span className="py-2 bg-indigo-50 block rounded">
              {instructor?.name}
            </span>
          </td>
          <td>
            <span className="py-2 bg-indigo-50 block rounded">
              {instructor?.emailOrPhone}
            </span>
          </td>
          <td className="flex">
            <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>
              handleRemove(instructor?._id)}>
              Remove
            </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    <button type="button" className="btn overflow-hidden bg-primary text-white rounded-md mt-5" onClick={()=>
      setPopUp(true)}
      >
      Add Instructor
    </button>
  </div>
  {popUp && (
  <AnimatePresence>
    <motion.div
      className="fixed top-0 left-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5 transition-colors"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div id="pop" className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg">
        <div className=" flex w-full justify-end pe-3">
          <i className="fa-solid fa-xmark text-white text-2xl cursor-pointer hover:animate-spin" onClick={()=>setPopUp(false)}></i>
        </div>
        <div className="bg-white p-3 px-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row mt-5 gap-3 py-5">
              <p>Enter the email or phone of to request to as instructor</p>
              <input type="text" name="nameOrEmail" className="bg-gray-200 rounded border-2 border-gray-300 px-2 py-2 focus:bg-blue-50 outline-primary" ref={emailOrPhone} />
            </div>
              <textarea name="message" id="message" rows="5" placeholder="enter the invitation message" className='w-full p-3 border-2 rounded '
                ref={message}></textarea>
          <button className="btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase w-full mt-9"> request</button>
          </form>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
  )}
</>
);
};

export default InstructorManagement;