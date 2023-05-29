import { useEffect, useState } from "react";
import organizerServices from "../../services/organizerServices";
import { setClasses } from "../../utils/store/organizerSlice";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "../../components/common/Shimmer";
import lectureServices from "../../services/lectureServices";
import CreateAssignment from "./CreateAssignment";

const AssignmentManagement = () => {

  const [active, setActive] = useState()
  const [popUp, setPopUp] = useState(false)
  const [assignments, setAssignments] = useState()
  const [loading, setLoading] = useState(true)
  const { classes } = useSelector(store=>store.organizer)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!classes){
      organizerServices.allClasses().then(res=>{
        dispatch(setClasses(res?.success?.classes))
    })
    }
  }, [])
  
  const handleSelection = async (classId) => {
    setLoading(true);
    const res = await lectureServices.allAssignments(classId)
    setLoading(false);
    setAssignments(res?.success?.assignments)
  }
  

  

  return (
    <div className="relative">
      <div className={`flex ${active? 'gap-3' : ''}`}>
        <div className={`box p-5 rounded-md transitions ${active ? 'w-1/2' : 'w-full'}`} onClick={()=>setActive(true)}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-white"><span className="bg-primary block rounded p-2">ID</span></th>
              <th className="text-white"><span className="bg-primary block rounded p-2">Class Name</span></th>
              <th className="text-white"><span className="bg-primary block rounded p-2">Class id</span></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {classes&& classes?.map((single, index)=>(
              <tr key={single._id} className="cursor-pointer border-2 border-transparent hover:border-b-primary rounded-md" onClick={()=>handleSelection(single._id)}>
                <td><span className="py-2 bg-indigo-50 block rounded">{index+1}</span></td>
                <td><span className="py-2 bg-indigo-50 block rounded">{single.name}</span></td>
                <td><span className="py-2 bg-indigo-50 block rounded">{single.uuid}</span></td>
            </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className={`box transitions overflow-hidden ${active ? 'w-1/2 p-5' : 'w-0'}`}>
          {loading? <Shimmer/> : assignments.map(assign=>(
            <div className="bg-tileColor p-2 mb-2 rounded">
              <div className="flex justify-between mb-2">
                <p>{assign.title}</p>
                <p>{assign.dueDate.split('T')[0]}</p>
              </div>
              <p className="text-sm px-5">{assign.description}</p>
            </div>
          ))}
        </div>
      </div>
      {popUp&&<div className="fixed top-0 left-0 h-full w-full grid place-items-center bg-black bg-opacity-25">
      <CreateAssignment close={()=>setPopUp(false)}/>
      </div>}
      <div className="fixed w-full left-0 pr-10 bottom-10">
        <button type="button" className="btn bg-primary overflow-hidden float-right rounded text-white" onClick={()=>setPopUp(popUp ? false : true)}>create new assignment</button>
      </div>
    </div>
  )
}

export default AssignmentManagement;