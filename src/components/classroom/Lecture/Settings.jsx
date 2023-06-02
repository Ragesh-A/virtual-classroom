import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classServices from "../../../services/classServices";
import { setCurrentClass } from "../../../utils/store/classesSlice";
import Button from '../../common/Button'
import { IMAGE_PATH } from "../../../constant/constant";
import defaultImage  from '../../../assets/images/bg.webp'

const Settings = () => {
  const {classId} = useParams();
  const {currentClass} = useSelector(store=>store.classes)
  const dispatch = useDispatch();
  const name = useRef()
  const bgImage = useRef()
  const description = useRef()
  const [err, setErr] = useState()
  const [succ, setSucc] = useState()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(currentClass?.class?.image)

  useEffect(()=>{
    if(!currentClass || (currentClass._id !== classId)){
      classServices.getClass(classId).then(res=>{
        dispatch(setCurrentClass(res?.success?.class))
      })
    }
  }, [classId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bgImage.current.value);
    const nameValue = name.current.value.trim()
    const descriptionValue = description.current.value.trim()
    if (nameValue === ''){
      setErr('is required')
      setTimeout(()=>{setErr(false)}, 2000)
    }
    setLoading(true)
    classServices.updateClass(classId,nameValue, descriptionValue, ).then(res=>{
      setLoading(false)
      if(res?.success){
        setSucc('updated successfully')
      }
      if(res?.error){
        setErr(res.error)
      }
      setTimeout(()=>{setErr(false); setSucc(false)}, 2000)
    })
  }

  const handleImage = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file)
   setImage(url)
  }
  

  return (
    <>
    <div className="">
      {succ&& <span className="text-green-500">{succ}</span>}
      <form onSubmit={handleSubmit} className="flex flex-col bg-tileColor max-w-md p-3 rounded ">
      <label className="font-bold text-slate-600 mb-1">Background {err&&<span className="text-red-500 text-sm font-mono">{err}</span>}</label>
      <img src={ currentClass?.class?.image ? IMAGE_PATH + `/classroom/${image}` : image ? image : defaultImage} alt='class background' className="max-h-[8rem]"/>
      
      <label htmlFor="name" className="font-bold text-slate-600 mb-1">name</label>
      <input type="text" name="name" id="name" defaultValue={currentClass?.class?.name} ref={name} className="p-1 rounded shadow shadow-shadow border border-blue-400 mb-3"/>
      <label htmlFor="description" className="font-bold text-slate-600 mb-1">description</label>
      <input type="text" name="description" id="description" defaultValue={currentClass?.class?.description} ref={description} className="p-1 rounded shadow shadow-shadow border border-blue-400 mb-3"/>
      <input name="image" id="image" type="file" accept="image/*" className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0" onChange={handleImage} ref={bgImage}/>
      <Button type="submit" loading={loading} className='bg-primary hover:bg-indigo-700 text-white px-2 py-2 rounded w-full'>update</Button>
      </form>
    </div>
    </>
  )
}

export default Settings;