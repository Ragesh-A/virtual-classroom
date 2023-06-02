import { useEffect } from "react";
import adminServices from "../../services/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { blockAndUnblockClass, setClasses } from "../../utils/store/adminSlice";

const ClassManagement = () => {

  const {classes} = useSelector(store=>store.admin)
  const dispatch = useDispatch()
  const handleBlock = (id) =>{
    dispatch(blockAndUnblockClass(id))
    adminServices.blockAndUnblockClass(id);
  }

  useEffect(()=>{
    if(!classes){
      adminServices.findAllClasses().then(res=>{
        console.log(res);
        dispatch(setClasses(res?.success?.classes))
      })
    }
  },[dispatch, classes])

  return (
    <div className="box p-5">
      <p className="text-center text-primary underline font-extrabold text-xl mb-5">Class management</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-white "><span className="bg-primary block rounded p-2">#</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Class Id</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">createdBy</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Status</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Action</span></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {classes && classes?.map((singleClass, index)=>(
            <tr key={singleClass._id}>
            <td><span className="py-2 bg-indigo-50 block rounded">{index + 1}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{singleClass.uuid}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{singleClass.createdBy.emailOrPhone}</span></td>
            <td><span className={`p-1 text-[10px] rounded font-bold border-2 ${singleClass.isBlocked ? 'bg-red-100 border-red-500 text-red-500': 'bg-green-100 border-green-500 text-green-500'} `}>{singleClass?.isBlocked ? 'blocked' : 'unBlocked'}</span></td>
            <td className="flex">
              <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>handleBlock(singleClass._id)}>Block</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ClassManagement;