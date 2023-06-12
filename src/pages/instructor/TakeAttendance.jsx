import { useEffect, useState } from "react";
import Shimmer from "../../components/common/Shimmer";
import { useNavigate, useParams } from "react-router-dom";
import lectureServices from "../../services/lectureServices";
import Avatar from "../../components/common/Avatar";
import attendanceService from "../../services/attendanceService";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";

const filterTheAttendance = ( array) =>{
const filtered = array?.map(({status, student})=>({ status, ...student}))
return filtered;
}

const TakeAttendance = () => {
  const [students, setStudents] = useState()
  const { classId } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=> {
    attendanceService.getTodayAttendance(classId).then((res)=>{
      if (res.success.attendance === null){
        lectureServices.allStudents(classId).then((res)=>{
          if (res?.success) setStudents(res.success?.enrolledStudents.students)
        })
      }else if (res.success.attendance){
        const filtered = filterTheAttendance(res?.success?.attendance.students)
        setStudents(filtered)
      }
    })
  }, [classId])

  const handleAttendance = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId ? { ...student, status: !student.status } : student
      )
    );
  };
  
  
  const handleSubmit = () => {
    attendanceService.submitAssignment(classId, students).then(res=>{
      if (res?.success){
        dispatch(setNotification({ success: true, message: res.success.message }));
        navigate(`/class/${classId}/dashboard/`)
      } 
      else dispatch(setNotification({ success: false, message: res.error.message }))
    })
  }


  if (!students) return <Shimmer count={2} />
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-primary text-white font-bold text-xl text-center py-2 rounded-md">Students</div>
        <div className="bg-primary text-white font-bold text-xl text-center py-2 rounded-md">Students</div>
        {
          students?.map(student => (
            <div className="flex items-center gap-3 bg-tileColor p-2 rounded justify-between" key={student?._id}>
              <div className="flex gap-3 items-center">
              <Avatar name={student.name} image={student.image} />
              <span>{student.name}</span>
              </div>
              <button className={`${student.status ? 'bg-primary text-white' : 'text-textColor bg-white'} present rounded p-3 py-1 `} onClick={()=>handleAttendance(student._id)}>{student.status ? 'Present' : 'Absent'}</button>
            </div>
          ))
          
        } 
        

      </div>
      <div className="fixed left-0 bottom-10 w-full flex pr-5 justify-end">
      {<button className="btn rounded overflow-hidden bg-primary text-white" onClick={handleSubmit}>submit attendance</button>}
    </div>
    </div>
  )
};

export default TakeAttendance;