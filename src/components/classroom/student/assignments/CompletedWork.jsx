import { useEffect, useState } from "react";
import assignmentService from "../../../../services/assignmentServices";
import { useParams } from "react-router-dom";
import Shimmer from "../../../common/Shimmer";
import { useDispatch } from "react-redux";
import { setAssignment } from "../../../../utils/store/classesSlice";
import { IMAGE_PATH } from "../../../../constant/constant";
import ExpandImages from "../../../common/ExpandImages";

const CompletedWork = () => {

  const {classId} = useParams()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState()
  const [source, setSource] = useState(false);
  const [assignments, setAssignments] = useState()

  useEffect(()=>{

    assignmentService.getAssignments(classId, 'completed').then((res)=>{
      if (res?.success){
        setAssignments(res.success.assignments)
        dispatch(setAssignment(res.success.assignments))
      }
    })
  console.log('working');
   return () =>{
    setAssignment()
   }
  }, [classId, dispatch,])



  if (!assignments) return <Shimmer count={3}/>
  return(
    <>
    {source && <ExpandImages source={source} close={setSource} />}
      {
        assignments?.map(assignment=>(
          <div className={`relative bg-tileColor rounded-md py-3 px-3 md:px-8 overflow-hidden transition mb-2 cursor-pointer hover:shadow hover:shadow-shadow ${selected === assignment?._id ? 'h-full' :  'h-12'} flex flex-col`} onClick={()=>setSelected(assignment?._id)} key={assignment?._id}>
            <div className={`${assignment?.accepted === 'accepted' ? 'bg-green-500' : assignment?.accepted === 'rejected' ? 'bg-red-500' : 'bg-blue-300'} text-white absolute px-8 py-1 -rotate-45 -left-7 top-2 md:top-4 text-[10px] md:text-normal`}>{assignment?.accepted}</div>
            <div className="flex flex-col md:flex-row justify-between mb-3">
              <p className="font-bold text-textColor ml-16">
                { assignment?.assignmentId?.title  }
                </p>
              <p className="text-gray-500 font-semibold text-sm">
                { assignment?.assignmentId?.dueDate?.split('T')[0]}
              </p>
             </div>
            <p className="text-[12px] md:text-normal">{ assignment?.assignmentId?.description }</p>
            {assignment?.answer && <p className="bg-white p-2 text-green-500">{assignment?.answer}</p>}
            {
                <div className="flex flex-wrap ">
                {
                  assignment?.image && assignment?.image?.map(x => (
                    <img draggable='false' src={`${IMAGE_PATH}submissions/${x}`} alt="" key={x}  loading="lazy" onClick={() =>setSource(`${IMAGE_PATH}submissions/${x}`)}/>
                  ))
                }
              </div>
            }
            <p> response: {assignment.response}</p>
          </div>
        )
      )
    }
    </> 
  )
};

export default CompletedWork;