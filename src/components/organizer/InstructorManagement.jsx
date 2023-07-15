import { useEffect, useRef, useState } from 'react';
import Shimmer from '../common/Shimmer';
import organizerServices from '../../services/organizerServices';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';
import  Button  from '../common/Button';
import { removeFromWaiting, removeInstructor, setInstructors, updateInstructor, updateWaiting } from '../../utils/store/organizerSlice';

const InstructorManagement = () => {
  const [fade, setFade] = useState();
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState(1)
  const message = useRef();
  const emailOrPhone = useRef();
  const dispatch = useDispatch()
  const { instructors } = useSelector(store=>store.organizer)
  
  setTimeout(() => {
    setFade(true);
  }, 10);
  
  
  useEffect(() => {
    organizerServices.getInstructors().then((res)=>{
      if (res?.error){
        dispatch(setNotification({ success: false, message: res.error}))
        return 
      }
      dispatch(setInstructors(res.success))
    })
  }, []);

  const handleSubmit = (e) =>{
      e.preventDefault();
      setLoading(true)
      organizerServices.sendInvitation(emailOrPhone.current.value, message.current.value).then(res=>{
        setLoading(false)
        setPopUp(false)
        if(res?.error){
          dispatch(setNotification({ success: false, message: res.error}))
        }
        if(res?.success){
          dispatch(setNotification({ success: true, message: res.success?.message}))
          dispatch(updateWaiting(res.success.user))
        }
      })
  }

  const handleRemove = (instructorId) =>{
    organizerServices.removeInstructor(instructorId).then(res=>{
      if(res?.error){
        dispatch(setNotification({ success: false, message: res.error}))
      }
      dispatch(removeInstructor(instructorId))
    })
  }

  const handleRemoveWaitingList = (user) =>{
    organizerServices.removeFromWaitingList(user).then(res=>{
      if(res?.error){
        dispatch(setNotification({ success: false, message: res.error}))
      }
      dispatch(removeFromWaiting(user))
    })
  }
  
  if (!instructors) {
  return <Shimmer count={3} />;
}

return (
<>

  <div className="box mb-1 pt-2 md:px-5 text-textColor text-xs font-bold">
    <ul className='flex gap-3'>
      <li className={`px-2 uppercase font-mono cursor-pointer border-4 border-transparent ${tab===1 && 'border-b-primary'}`} onClick={()=>setTab(1)}>instructors</li>
      <li className={`px-2 uppercase font-mono cursor-pointer border-4 border-transparent ${tab===2 && 'border-b-primary'}`} onClick={()=>setTab(2)}>waiting list</li>
    </ul>
  </div>

  { tab===1 ? <div className={`box p-1 md:p-5 rounded ${ !fade ? 'opacity-0' : 'opacity-100' } transitions`}>
    <p className="text-center text-primary underline font-extrabold text-xl mb-5">
      Instructor management
    </p>
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-white "><span className="bg-lightPrimary block rounded p-2">#</span></th>
          <th className="text-white "><span className="bg-lightPrimary block rounded p-2">instructor name</span></th>
          <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Contact</span></th>
          <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Action</span></th>
        </tr>
      </thead>
      <tbody className="text-center">
        {instructors.instructors &&
        instructors.instructors?.map((instructor, index) => (
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
    <div className="absolute bottom-10 right-10">
    <button
     type="button"
     className="btn px-4 py-2 overflow-hidden bg-primary text-white rounded-md mt-5"
     onClick={()=>setPopUp(true)}
      >
        <i className="fa-solid fa-plus md:hidden"></i>
        <span className='hidden md:flex'> Add Instructor</span>
    </button>
    </div>
    
  </div>
   :
   <div className={`box p-1 md:p-5 rounded ${ !fade ? 'opacity-0' : 'opacity-100' } transitions`}>
   <p className="text-center text-primary underline font-extrabold text-xl mb-5">
     waiting list
   </p>
   <table className="w-full">
     <thead>
       <tr>
         <th className="text-white "><span className="bg-lightPrimary block rounded p-2">#</span></th>
         <th className="text-white "><span className="bg-lightPrimary block rounded p-2">instructor</span></th>
         <th className="text-white "><span className="bg-lightPrimary block rounded p-2">expire</span></th>
         <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Action</span></th>
       </tr>
     </thead>
     <tbody className="text-center">
       {instructors.waiting &&
       instructors.waiting?.map((instructor, index) => (
       <tr key={instructor?.user}>
         <td>
           <span className="py-2 bg-indigo-50 block rounded">
             {index + 1}
           </span>
         </td>
         <td>
           <span className="py-2 bg-indigo-50 block rounded">
             {instructor?.user}
           </span>
         </td>
         <td>
           <span className="py-2 bg-indigo-50 block rounded">
             {instructor?.expire.split('T')[0]}
           </span>
         </td>
         <td className="flex">
           <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>
             handleRemoveWaitingList(instructor?.user)}>
             Remove
           </button>
         </td>
       </tr>
       ))}
     </tbody>
   </table>
   <div className="absolute bottom-10 right-10">
   <button
     type="button"
     className="btn px-4 py-2 overflow-hidden bg-primary text-white rounded-md mt-5"
     onClick={()=>setPopUp(true)}
      >
        <i className="fa-solid fa-plus md:hidden"></i>
        <span className='hidden md:flex'> Add Instructor</span>
    </button>
   </div>
 </div>
    }
  {popUp && (
    <div className="fixed top-0 left-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5 transition-colors">
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
                <Button type='submit' loading={loading} className='overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase w-full mt-3'>invite</Button>
          </form>
        </div>
      </div>
    </div>
  )}
</>
);
};

export default InstructorManagement;