import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import assignmentService from "../../../../services/assignmentServices";
import { useParams } from "react-router-dom";

const SubmitAssignment = ({assignmentId, close}) => {
    const {assignments} = useSelector(store=>store.classes);
    const {classId} = useParams()
    const [err, setErr] = useState()
    const [succ, setSucc] = useState()
    const selected = assignments.filter(assignment=>{
      return assignment._id === assignmentId;
    })
    const ans = useRef()
    const [error, setError] = useState()

    const submitAnswer = () =>{
      const answer = ans.current.value.trim()
      if(!answer){
        setError(' should not empty')
        setTimeout(()=>{setError(false)}, 2000)
      }else{
        assignmentService.submitAssignment(classId, assignmentId, answer).then(res=>{
          if(res?.success){
            setSucc('submitted')
          }else{
            setErr(res?.error)
          }
          setTimeout(()=>{
            setErr(false)
            setSucc(false)
          },2000)
        })
      }
    }

    return (
      <>
      <div className={`bg-tileColor rounded-md py-8 px-8 overflow-hidden transition mb-2 cursor-pointer hover:shadow hover:shadow-shadow`}>
        {err&&<p className="uppercase text-red-500 mb-2">{err}</p>}
        {succ&&<p className="uppercase text-green-500 mb-2">{succ}</p>}
      <div className="flex justify-between mb-8">
        <p className="font-bold text-textColor">{selected[0]?.title}</p>
        <p className="text-gray-500 font-semibold">{selected[0]?.dueDate}</p>
      </div>
      <p className="mb-5">{selected[0]?.description}</p>
      <label htmlFor="answer" className={`${error ? 'text-red-500': ''}`}>Answer</label>{error&&<span className="text-red-500">{error}</span>}
      <textarea name="answer" id="answer" rows="10" className="w-full rounded-md mt-1 p-3 outline-none" required ref={ans}></textarea>
      <button className="btn bg-black overflow-hidden float-right rounded-md text-white mt-6 ml-5" onClick={close}>close </button>
      <button className="btn bg-primary overflow-hidden float-right rounded-md text-white mt-6" onClick={submitAnswer}>submit </button>
    </div>
      </>
    )
};

export default SubmitAssignment;