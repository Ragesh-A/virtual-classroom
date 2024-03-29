import { useEffect, useState } from "react";
import SubmitAssignment from "./SubmitAssignment";
import assignmentService from "../../../../services/assignmentServices";
import { useParams } from "react-router-dom";
import Shimmer from "../../../common/Shimmer";
import { useDispatch } from "react-redux";
import { setAssignment } from "../../../../utils/store/classesSlice";

const PendingAssignments = () => {

  const [pending, setPending] = useState()
  const {classId} = useParams()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState()
  const [selectedAssignment, setSelectedAssignment] = useState();

  useEffect(()=>{
   if (!selectedAssignment) {
    assignmentService.getAssignments(classId, 'pending').then((res)=>{
      if (res?.success){
        setPending(res.success.assignments)
        dispatch(setAssignment(res.success.assignments))
      }
    })
   }
  }, [classId, selectedAssignment])



  if (!pending) return <Shimmer count={3}/>

  return(
    <>
    {!selectedAssignment ? <>

      {
        pending?.map(assignment=>(
          <div className={`bg-tileColor rounded-md py-3 px-8 overflow-hidden transition mb-2 cursor-pointer hover:shadow hover:shadow-shadow ${selected === assignment?._id ? 'h-full' :  'h-12'}`} onClick={()=>setSelected(assignment?._id)} key={assignment._id}>
            <div className="flex justify-between mb-3">
              <p className="font-bold text-textColor">{assignment?.title}</p>
              <p className="text-gray-500 font-semibold">{assignment?.dueDate.split('T')[0]}</p>
             </div>
            <p>{assignment?.description}</p>
            <button className="btn px-4 py-1 bg-primary overflow-hidden float-right rounded-md text-white" onClick={()=>setSelectedAssignment(assignment._id)}>solve task</button>
          </div>
        )
      )
    }

    </> :
    <SubmitAssignment assignmentId={selectedAssignment} close={()=>setSelectedAssignment(false)}/>}
    </>
  )
}

export default PendingAssignments;