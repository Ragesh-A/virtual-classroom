import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import organizerServices from "../../services/organizerServices";
import { setClasses } from "../../utils/store/organizerSlice";
import Shimmer from '../common/Shimmer'
import SingleClassManagement from "./SingleClassManagement";
import { setNotification } from "../../utils/store/uiSlice";


const ClassManagement = () => {

  const [fade, setFade ] = useState();
  const [slider, setSlider] = useState(false);
  const [selectedClass, setSelectedClass] = useState(false);
  const { classes } = useSelector(store=>store.organizer)
  const dispatch = useDispatch();

  setTimeout(()=>{ setFade(true)}, 10)

  useEffect(()=>{
    if(!classes){
      organizerServices.allClasses().then(res=>{
        if (res?.success) dispatch(setClasses(res?.success?.classes))
        if (res?.error) dispatch(setNotification({ success: false, message: res.error})) 
    })
    }
  }, [])

  const handleSection = (classId) =>{
    setSlider(true)
    setSelectedClass(classId)
  }

  if(!classes){
    return <>
    <Shimmer />
    <Shimmer />
    <Shimmer />
    </>
  }

  return (<>
    <div className={`box p-5 rounded ${!fade ? 'opacity-0' : 'opacity-100'} transitions`}>
      <p className="text-center text-primary underline font-extrabold text-xl mb-5">Classes management</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">#</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Uuid</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Class name</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Lecture name</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Action</span></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {classes && classes?.map((singleClass, index)=>(
            <tr key={singleClass?._id}>
            <td><span className="py-2 bg-indigo-50 block rounded">{index + 1}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{singleClass?.uuid}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{singleClass?.name}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{singleClass?.instructor?.name}</span></td>    
            <td className="flex">
              <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>handleSection(singleClass?._id)}>Select</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    {slider&&<SingleClassManagement setState={setSlider} classid={selectedClass} />}
    </>
  )
};

export default ClassManagement;