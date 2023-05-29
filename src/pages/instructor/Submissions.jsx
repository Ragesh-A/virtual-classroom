import { useEffect, useState } from "react";
import CreateAssignment from "../../components/classroom/Lecture/CreateAssignment";
import lectureServices from "../../services/lectureServices";
import { Link, useParams } from "react-router-dom";

const Submissions = () => {

  const [selected, setSelected] = useState()
  const [assignments, setAssignments] = useState()
  const [newAssignment, setNewAssignment] = useState();
  const {classId, assignmentId} = useParams();
  useEffect(()=>{
    lectureServices.allSubmissions(classId, assignmentId).then(res=>{
      console.log(res);
      if(res?.success){

        setAssignments(res?.success?.submissions)
      }
    })
  },[])
 
  return (
   <div className="relative grid gap-2">

    
    {assignments && assignments.map(assignment=>(
      <div className={`bg-tileColor rounded-md p-3 overflow-hidden transition  ${selected === assignment?._id ? 'h-full' :  'h-12'}`} onClick={()=>setSelected(assignment?._id)} key={assignment._id}>
      <div className="flex justify-between mb-2">
        <p className="font-bold text-textColor">{assignment?.student.name}</p>
        <p className="text-gray-500 font-semibold">{assignment?.dueDate}</p>
      </div>
      <p>{assignment?.answer}</p>
    </div>
    ))}
    
   
    
   </div>
  )
};

export default Submissions;