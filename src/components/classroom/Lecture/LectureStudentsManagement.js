import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lectureServices from '../../../services/lectureServices';
import StudentsRequests from './StudentRequests';
import { useSelector } from 'react-redux';
import ConfirmBox from '../../common/ConfirmBox';
import Avatar from '../../common/Avatar';

const LectureStudentsManagement = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [ showRequest, setShowRequest] = useState(false);
  const [popup, setPopup] = useState(false)
  const [ students, setStudents] =  useState([]);
  const { classId } = useParams();
  const {currentClass} = useSelector(store=>store.classes)

  useEffect(()=>{
    lectureServices.allStudents(classId).then(res=>{
      if(res?.success){
        setStudents(res?.success?.enrolledStudents?.students)
        setIsRequest(res?.success?.requestingStudents?.waiting)
      }
    })
  },[classId])

  const removeHandle = (studentId) => {
    lectureServices.removeFromClass(classId, studentId).then(res=>{
      if (res?.success) {
        const filtered = filterUser (studentId, students)
        setStudents(filtered)
      }
    })
  }

  const handleAccept = (studentId) => {
    lectureServices.acceptRequest(classId, studentId).then(res=>{
      if (res?.success) {
        const user = isRequest.find(s=> s?._id === studentId)
        setStudents([...students, user])
        const filtered = filterUser(studentId, isRequest);
        setIsRequest(filtered);
        if (filtered.length < 1) {
          setShowRequest(false)
        }
      }
    })
  }

  const removeFromRequest = (studentId) => {
    lectureServices.rejectRequest(classId, studentId).then(res=>{
      if (res?.success) {
        const filtered = filterUser(studentId, isRequest)
        setIsRequest(filtered)
        if (filtered.length < 1) {
          setShowRequest(false)
        }
      }
    })
  }

  function filterUser(studentId, array=[]) {
    const filtered = array.filter(s=> s?._id !== studentId);
    return filtered;
  }

  return (
    <>
    <ConfirmBox visible={popup} setVisibleFn={setPopup} accepted={removeHandle}/>
      <div className="bg-primary flex items-center justify-between px-5 py-2 rounded mb-2 font-bold gap-1">
        <p className="text-white capitalize">{currentClass?.class?.name}</p> <span className='text-primary bg-white px-2 py-2 rounded ml-5 cursor-copy'>{currentClass?.class?.uuid}</span>
        {isRequest && isRequest.length > 0 ? <button  onClick={()=>setShowRequest(prev=>!prev)} className="bg-white rounded p-2 px-5 text-primary">
          {showRequest ? 'Students' : 'Requests'}
        </button>:null}
      </div>
      
      {!showRequest && (!students || students?.length === 0)  ? <div className="grid place-items-center h-[50vh] font-bold text-3xl text-gray-400">it seems empty here</div> : ''
      
      }

      {!showRequest && students && students?.map(student=>(
        <div className="bg-tileColor transitions shadow-inner hover:shadow border-white border-2 p-1 md:p-3 flex justify-between items-center mb-2" key={student._id}>
        <div className="flex items-center gap-5">
          <Avatar image={student?.avatar} name={student.name}/>
          <p className="font-bold  text-textColor">{student.name}</p>
        </div>
        <div className="flex gap-2 md:gap-4">
          {/* <button className="bg-white text-textColor font-bold text-sm px-3 py-2 rounded hover:shadow hover:shadow-shadow">
            <i className="fa-solid fa-eye md:me-2"></i>
            <span className='hidden md:block'>VIEW</span>
          </button> */}
          <button className="bg-primary border-2 border-primary  text-white font-bold text-[10px] md:text-sm px-2 md:px-5 py-2 rounded hover:shadow hover:bg-white hover:text-primary hover:border-primary" onClick={()=>setPopup(student._id)}>
            Remove
          </button>
        </div>
      </div>
      ))
      }
      {showRequest && isRequest && <StudentsRequests setPopup={setPopup} requests={isRequest} handleAccept={handleAccept} handleRemove={removeFromRequest}/>}
    </>
  );
};

export default LectureStudentsManagement;
