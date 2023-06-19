import { useEffect, useState } from "react";
import assignmentService from "../../../../services/assignmentServices";
import { useParams } from "react-router-dom";
import Shimmer from "../../../common/Shimmer";
import { useDispatch } from "react-redux";
import { setAssignment } from "../../../../utils/store/classesSlice";
import { IMAGE_PATH } from "../../../../constant/constant";

const CompletedWork = () => {

  const [assignments, setAssignments] = useState()
  const {classId} = useParams()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState()

  useEffect(()=>{
  //  if (!selectedAssignment) {
    assignmentService.getAssignments(classId, 'completed').then((res)=>{
      if (res?.success){
        setAssignments(res.success.assignments)
        dispatch(setAssignment(res.success.assignments))
      }
    })
  //  }
   return () =>{
    setAssignment()
   }
  }, [classId, dispatch,])



  if (!assignments) return <Shimmer count={3}/>
  return(
    <>
      {
        assignments?.map(assignment=>(
          <div className={`bg-tileColor rounded-md py-3 px-8 overflow-hidden transition mb-2 cursor-pointer hover:shadow hover:shadow-shadow ${selected === assignment?._id ? 'h-full' :  'h-12'} flex flex-col`} onClick={()=>setSelected(assignment?._id)} key={assignment?._id}>
            <div className="flex justify-between mb-3">
              <p className="font-bold text-textColor">
                { assignment?.assignmentId?.title  }
                </p>
              <p className="text-gray-500 font-semibold">
                { assignment?.assignmentId?.dueDate?.split('T')[0]}
              </p>
             </div>
            <p>{ assignment?.assignmentId?.description }</p>
            {assignment?.answer && <p className="bg-white p-2 text-green-500">{assignment?.answer}</p>}
            {
                <div className="flex flex-wrap ">
                {
                  assignment?.image && assignment?.image?.map(x => (
                    <img draggable='false' src={`${IMAGE_PATH}submissions/${x}`} alt="" key={x}  loading="lazy"/>
                  ))
                }
              </div>
            }
          </div>
        )
      )
    }
    </> 
  )
};

export default CompletedWork;