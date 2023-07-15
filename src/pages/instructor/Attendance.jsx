import { useEffect, useState } from "react";
import lectureServices from "../../services/lectureServices";
import { useParams } from "react-router-dom";
import TakeAttendance from "./TakeAttendance";
import Avatar from "../../components/common/Avatar";

const Attendance = () => {

  const {classId} = useParams()
  const date = new Date().toDateString()
  const [todayAttendance, setTodyAttendance] = useState(null)
  const [takeAttendance, setTakeAttendance] = useState();

  useEffect(()=>{
    lectureServices.getTodayAttendance(classId).then((res)=>{
      if (res?.success.attendance){
        setTodyAttendance(res.success?.attendance?.students);
      }
    })
  }, [classId])

  if (todayAttendance === null && !takeAttendance) return (<div className='h-full grid place-items-center bg-tileColor'>
    <span className="font-bold md:text-2xl text-textColor">Today attendance not taken</span>
      <div className="absolute left-0 bottom-24 w-full flex pr-20 justify-end">
      {<button className="btn px-3 py-2 rounded overflow-hidden bg-primary text-white" onClick={()=>setTakeAttendance(true)}>Take Attendance</button>}
    </div>
    </div>)

  return (
    <>
    
    {!takeAttendance ? <div className="rounded-md overflow-y-scroll scroll relative transitions h-full">
        <p className="text-right font-bold text-textColor pe-3 py-2 absolute -top-7 right-0">{date}</p>
      <div className="grid grid-cols-2">
        
        <div className="">
          
          <div className="bg-primary text-center relative xl:text-2xl md:py-[.7rem] after:contents[''] after:w-0 after:border-[12px]  md:after:border-[24px] xl:after:border-[28px] after:border-primary after:border-b-transparent after:border-r-transparent after:h-0  after:absolute after:-right-[1.4rem] md:after:-right-[2.9rem] xl:after:-right-[3.4rem] after:-top-0 after:z-[1] text-white rounded-s-md mb-1">Present</div>
          <ul>
          {
            todayAttendance?.map(x=>(x.status ? <li key={x._id} className="p-1">
              <div className="flex items-center gap-3 bg-tileColor p-2 rounded justify-between">
              <div className="flex gap-3 items-center">
              <span className="hidden md:block"><Avatar name={x.student.name} image={x.student.image} /></span>
              <span className="capitalize font-bold text-textColor">{x.student.name}</span>
              </div>
            </div>
            </li> : null))
            
           } 
          </ul>
        </div>
        
        <div className="">
        <div className="bg-tileColor text-center relative xl:text-2xl md:py-[.7rem] rounded-e-md mb-1">Absentees</div>
        <ul>
           {
            todayAttendance?.map(x=>(x.status ? null : <li key={x._id} className="p-1"><div className="flex items-center gap-3 bg-tileColor p-2 rounded justify-between">
            <div className="flex gap-3 items-center">
            <span className="hidden md:block"><Avatar name={x.student.name} image={x.student.image} /></span>
            <span className="capitalize font-bold text-textColor">{x.student.name}</span>
            </div>
          </div></li>))
           } 
          </ul>
        </div>
      </div>
      <div className="fixed left-0 bottom-20 md:bottom-10 w-full flex pr-5 justify-end">
      {<button className="btn rounded px-3 py-2 overflow-hidden bg-primary text-white" onClick={()=>setTakeAttendance(true)}>Take Attendance</button>}
    </div>
    </div> : <TakeAttendance />}
    </>
  )
};

export default Attendance;
