import { useEffect, useState } from "react";
import CreateAssignment from "../../components/classroom/Lecture/CreateAssignment";
import lectureServices from "../../services/lectureServices";
import { Link, useParams } from "react-router-dom";

const AssignmentManagement = () => {

  const [selected, setSelected] = useState()
  const [assignments, setAssignments] = useState()
  const [newAssignment, setNewAssignment] = useState();
  const {classId} = useParams();
  
  useEffect(()=>{
    lectureServices.allAssignments(classId).then(res=>{
      if(res?.success){
        setAssignments(res?.success?.assignments)
      }
    })
  },[classId])

  const addNewAssignment = (assignment) => {
    setAssignments([...assignments, assignment])
  }
 
  return (
   <div className="relative grid gap-2">

    { newAssignment&& <CreateAssignment addNew={addNewAssignment} close={()=>setNewAssignment(false)}/>}

    {assignments && assignments.map(assignment=>(
      <div className={`bg-tileColor rounded-md p-3 overflow-hidden transition  ${selected === assignment?._id ? 'h-full' :  'h-12'}`} onClick={()=>setSelected(assignment?._id)} key={assignment._id}>
      <div className="flex justify-between mb-2">
        <p className="font-bold text-textColor">{assignment?.title}</p>
        <p className="text-gray-500 font-semibold">{assignment?.dueDate.split('T')[0]}</p>
      </div>
      <p>{assignment?.description}</p>
      <Link className="btn overflow-hidden bg-primary text-white mt-5 float-right" to={`${assignment?._id}/submissions`}>view submissions</Link>
      <Link className="btn overflow-hidden bg-primary text-white mt-5 float-right mr-2" to={assignment?._id}>Edit assignment</Link>
    </div>
    ))}
    
   
    <div className="fixed left-0 bottom-10 w-full flex pr-5 justify-end">
      {!newAssignment&&<button className="btn rounded overflow-hidden bg-primary text-white" onClick={()=>setNewAssignment(true)}>New Assignment</button>}
    </div>
   </div>
  )
};

export default AssignmentManagement;