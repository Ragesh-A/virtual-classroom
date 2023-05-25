import { useEffect, useState } from 'react';
import imgs from '../../../assets/images/person.png';
import { Link, useParams } from 'react-router-dom';
import lectureServices from '../../../services/lectureServices';
import StudentsRequests from './StudentRequests';

const LectureStudentsManagement = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [ showRequest, setShowRequest] = useState(true)
  const [ students, setStudents] =  useState([]);
  const { classId } = useParams();
  useEffect(()=>{
    lectureServices.allStudents(classId).then(res=>{
      if(res?.success){
        setStudents(res?.success?.enrolledStudents?.students)
        setIsRequest(res?.success?.requestingStudents?.waiting)
      }
    })
  },[])

  const removeHandle = (studentId) => {
    lectureServices.removeFromClass(classId, studentId).then(res=>{
      console.log(res)
    })
  }

  return (
    <>
      <div className="bg-primary capitalize flex items-center justify-between px-5 py-2 rounded mb-2 font-bold">
        <p className="text-white ">Computer science</p>
        {isRequest && isRequest.length > 0 ? <Link  to={`/class/${classId}/requests`} className="bg-white rounded p-2 px-5 text-primary">
          Requests
        </Link>:null}
      </div>
      
      {/* {!students || students?.length === 0  ? <div className="grid place-items-center h-[50vh] font-bold text-3xl text-gray-400">it seems empty here</div> : ''
      
      } */}

      {students && students.map(student=>(
        <div className="bg-tileColor transitions shadow-inner hover:shadow border-white border-2 p-3 flex justify-between items-center mb-2" key={student._id}>
        <div className="flex items-center gap-5">
          <img src={imgs} alt="" width="70px" height="70px" />
          <p className="font-bold  text-textColor">TEST name</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-textColor font-bold text-sm px-3 py-2 rounded hover:shadow hover:shadow-shadow">
            <i className="fa-solid fa-eye me-2"></i>
            VIEW
          </button>
          <button className="bg-primary border-2 border-primary  text-white font-bold text-sm px-5 py-2 rounded hover:shadow hover:bg-white hover:text-primary hover:border-primary" onClick={()=>removeHandle(student._id)}>
            Remove
          </button>
        </div>
      </div>
      ))
      }
      {showRequest && isRequest && <StudentsRequests requests={isRequest} />}
    </>
  );
};

export default LectureStudentsManagement;
