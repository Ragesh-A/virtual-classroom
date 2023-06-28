import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import assignmentService from "../../services/assignmentServices";
import { setNotification } from "../../utils/store/uiSlice";
import { useDispatch } from "react-redux";
import Shimmer from "../../components/common/Shimmer";
import { IMAGE_PATH } from "../../constant/constant";
import ExpandImages from "../../components/common/ExpandImages";

const ViewSubmission = () => {

  const [source, setSource] = useState(false)
  const [response, setResponse] = useState('') 
  const [submission, setSubmission] = useState()
  const [isActiveResponse, setIsActiveResponse] = useState(false)
  const {submissionId, classId, assignmentId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateSubmission = () => {
    const payload = {...isActiveResponse, response}
    assignmentService.updateSubmission(classId, submissionId, payload).then(res =>{
      setIsActiveResponse(false)
      setResponse('')
      if (res?.success) {
        setSubmission(res?.success?.submission)
      } else {
        dispatch(setNotification({ success: false, message: res.error }))
      }
    })
  }

  useEffect(()=> {
    assignmentService.getAssignment(submissionId, classId, assignmentId).then(res => {
      if (res?.success?.submission) {
        setSubmission(res?.success?.submission)
      }
      else {
        dispatch(setNotification({ success: false, message: res?.error}))
      }
    })
  }, [assignmentId, classId, dispatch, submissionId])
  
  if (!submission) return <Shimmer />

  return (
    <div className="bg-tileColor relative p-2">
      {isActiveResponse && <div className="fixed top-0 left-0 w-full h-full bg-black z-[3] bg-opacity-40 grid place-items-center">
        <div className="bg-tileColor p-2 px-5 rounded  min-w-[300px] ">
        <p className="font-bold  text-gray-500 py-3">Tell us why {isActiveResponse?.accepted}</p>
        <textarea value={response} onChange={(e)=>setResponse(e.target.value)} rows="10" className="w-full outline-none p-2 mb-3"></textarea>
        
          <button className="px-2 py-1 bg-white text-textColor rounded" onClick={()=>setIsActiveResponse(false)}>cancel</button>
          <button className="float-right px-2 py-1 bg-primary text-white rounded" onClick={updateSubmission}>send</button>
      
        </div>
      </div> }
      { source && <ExpandImages close={setSource} source={source} />}
      <div className={`${submission?.accepted === 'accepted' ? 'bg-green-500' : submission?.accepted === 'rejected' ? 'bg-red-500' : 'bg-blue-300'} text-white absolute px-8 py-1 -rotate-45 -left-7 top-4`}>{submission?.accepted}</div>
      <div className="ml-20">
      <p className="font-bold  text-textColor">{submission?.assignmentId?.title}</p>
      <span>{submission?.assignmentId?.createdAt?.toLocalISOString()?.split('T')[0]}</span>
      </div>
      <p className="ml-16">{submission?.assignmentId?.description }</p>
      {submission.answer && <p className="px-5 py-1 rounded-md bg-white">{submission.answer}</p>}
      {submission.image.length !== 0 &&<div className="flex flex-wrap gap-2 mt-3">
        {
          submission.image.map(image => (
            <img src={`${IMAGE_PATH}submissions/${image}`} alt="submission" key={image} className="max-w-md cursor-pointer" onClick={()=>setSource(`${IMAGE_PATH}submissions/${image}`)}/>
          ))
        }
        </div>}
        <div className=" flex gap-2 mt-2">
          <button
            disabled={submission?.accepted === 'rejected'}
            className={`flex-1 text-white rounded-md py-1 ${submission?.accepted === 'rejected' ? 'bg-gray-400' : 'bg-red-500'}`}
            onClick={()=>setIsActiveResponse({accepted : 'rejected'})}
          >
            reject
          </button>
          <button
            disabled={submission?.accepted === 'accepted'}
            className={`flex-1 text-white rounded-md py-1 ${submission?.accepted === 'accepted' ? 'bg-gray-400' : 'bg-green-500'}`}
            onClick={()=>setIsActiveResponse({accepted : 'accepted'})}
          >
            accept
          </button>
        </div>
        <button type="button" className="w-full bg-gray-800 text-white rounded-md mt-2 py-1" onClick={()=>navigate(-1)}>back</button>
    </div>
  )
};

export default ViewSubmission;