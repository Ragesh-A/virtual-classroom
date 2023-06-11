import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import assignmentService from "../../../../services/assignmentServices";
import { useParams } from "react-router-dom";
import { IMAGE_PATH } from "../../../../constant/constant";
import SelectImages from "../../../common/SelectImages";

const SubmitAssignment = ({assignmentId, close}) => {
    const {assignments} = useSelector(store=>store.classes);
    const {classId} = useParams()
    const [err, setErr] = useState()
    const [succ, setSucc] = useState()
    const fileRef = useRef()
    const [addImage, setAddImage] = useState(false)
    const selected = assignments.filter(assignment=>{
      return assignment._id === assignmentId;
    })
    const ans = useRef()
    const [error, setError] = useState()

    const submitAnswer = () =>{
      const answer = ans.current.value.trim()
      console.log(fileRef.current.files);
      const files = fileRef.current.files
      if(!answer && [...files].length === 0){
        setError(' should not empty')
        setTimeout(()=>{setError(false)}, 2000)
      }else{
        assignmentService.submitAssignment(classId, assignmentId, {answer, image: [...files]}).then(res=>{
          if(res?.success){
            setSucc('submitted')
            close();
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
      <div className={`bg-tileColor rounded-md py-8 px-8 overflow-hidden transition mb-2 hover:shadow hover:shadow-shadow relative`}>
        {err&&<p className="uppercase text-red-500 mb-2">{err}</p>}
        {succ&&<p className="uppercase text-green-500 mb-2">{succ}</p>}
      <div className="flex justify-between mb-8">
        <p className="font-bold text-textColor">{selected[0]?.title}</p>
        <p className="text-gray-500 font-semibold">Due: {selected[0]?.dueDate?.split('T')[0]}</p>
      </div>
      <p className="mb-5">{selected[0]?.description}</p>
      <label htmlFor="answer" className={`${error ? 'text-red-500': ''}`}>Answer</label>{error&&<span className="text-red-500">{error}</span>}
      {/* <textarea name="answer" id="answer" rows="10" className="w-full rounded-md mt-1 p-3 outline-none" required ref={ans}></textarea> */}
      <div className="flex gap-2 flex-col-reverse md:flex-row">
        <textarea name="answer" id="answer" rows="10" className={`w-full font-mono mt-2 p-3 tracking-wider
          rounded outline-none border-b-2 border-b-primary text-slate-600"`} required ref={ans}></textarea>
        { selected[0]?.image && <div className="pt-2">
          <p className="font-bold text-gray-800 mb-1">REFERENCE</p>
          <img src={`${IMAGE_PATH}assignments/${selected[0].image}`} alt="reference" className='max-w-[350px] overflow-hidden rounded-md' />
        </div>}
      </div>
      <div className="flex flex-col md:flex-row mt-1  justify-between">
      <div className="flex items-center">
        <button htmlFor="image"
          className="bg-lightPrimary text-white p-2 px-5  rounded-full gap-3 my-1  flex items-center justify-center min-h-[40px] min-w-[40px]"
          onClick={()=> setAddImage(true)}
          >
          <i className="ri-image-add-line"></i>
          <span>add reference</span>
        </button>
      
      </div>
      <div className="">
        <button type="button" className="btn overflow-hidden bg-gray-700 hover:bg-black rounded-full mr-5 text-white " onClick={close}>
          cancel
        </button>
        <button type="button" onClick={submitAnswer} className="btn overflow-hidden bg-indigo-500 hover:bg-primary rounded-full text-white">
          Assign
        </button>
      </div>
    </div>
    </div>
    <SelectImages fileRef={fileRef} open={addImage} close={()=>setAddImage(false)}/>
      </>
    )
};

export default SubmitAssignment;