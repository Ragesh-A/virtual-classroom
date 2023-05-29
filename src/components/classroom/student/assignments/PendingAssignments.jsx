import { useState } from "react";
import { useSelector } from "react-redux"
import SubmitAssignment from "./SubmitAssignment";

const PendingAssignments = () => {

  const {assignments} = useSelector(store=>store.classes);
  const [selected, setSelected] = useState()
  const [selectedAssignment, setSelectedAssignment] = useState();

  return(
    <>
    {!selectedAssignment ? <>

      {
      assignments?.map(assignment=>(
        <div className={`bg-tileColor rounded-md py-3 px-8 overflow-hidden transition mb-2 cursor-pointer hover:shadow hover:shadow-shadow ${selected === assignment?._id ? 'h-full' :  'h-12'}`} onClick={()=>setSelected(assignment?._id)} key={assignment._id}>
      <div className="flex justify-between mb-3">
        <p className="font-bold text-textColor">{assignment?.title}</p>
        <p className="text-gray-500 font-semibold">{assignment?.dueDate.split('T')[0]}</p>
      </div>
      <p>{assignment?.description}</p>
      <button className="btn bg-primary overflow-hidden float-right rounded-md text-white" onClick={()=>setSelectedAssignment(assignment._id)}>solve task</button>
    </div>
      ))
    }

    </> :
    <SubmitAssignment assignmentId={selectedAssignment} close={()=>setSelectedAssignment(false)}/>}
    </>
  )
}

export default PendingAssignments;