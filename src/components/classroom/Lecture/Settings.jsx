import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classServices from "../../../services/classServices";
import { setCurrentClass } from "../../../utils/store/classesSlice";

const Settings = () => {
  const {classId} = useParams();
  const {currentClass} = useSelector(store=>store.classes)
  const dispatch = useDispatch();
  const name = useRef()
  const description = useRef()
  const [err, setErr] = useState()
  const [succ, setSucc] = useState()

  useEffect(()=>{
    if(!currentClass || currentClass._id !== classId){
      classServices.getClass(classId).then(res=>{
        dispatch(setCurrentClass(res?.success?.class))
      })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameValue = name.current.value.trim()
    const descriptionValue = description.current.value.trim()
    if (nameValue === ''){
      setErr('is required')
      setTimeout(()=>{setErr(false)}, 2000)
    }
    classServices.updateClass(classId,nameValue, descriptionValue).then(res=>{
      if(res?.success){
        setSucc('updated successfully')
      }
      if(res?.error){
        setErr(res.error)
      }
      setTimeout(()=>{setErr(false); setSucc(false)}, 2000)
    })
  }
  

  return (
    <>
    <div className="">
      {succ&& <span className="text-green-500">{succ}</span>}
      <form onSubmit={handleSubmit} className="flex flex-col bg-tileColor max-w-md p-3 rounded ">
      <label htmlFor="name" className="font-bold text-slate-600 mb-1">name {err&&<span className="text-red-500">{err}</span>}</label>
      <input type="text" name="name" id="name" defaultValue={currentClass?.class?.name} ref={name} className="p-1 rounded shadow shadow-shadow border border-blue-400 mb-3"/>
      <label htmlFor="description" className="font-bold text-slate-600 mb-1">description</label>
      <input type="text" name="description" id="description" defaultValue={currentClass?.class?.description} ref={description} className="p-1 rounded shadow shadow-shadow border border-blue-400 mb-3"/>
      <button type="submit" className="btn bg-indigo-500 overflow-hidden uppercase text-white">update</button>
      </form>
    </div>
    </>
  )
}

export default Settings;