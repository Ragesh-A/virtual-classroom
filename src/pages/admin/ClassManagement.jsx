import { useEffect, useState } from "react";
import adminServices from "../../services/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { blockAndUnblockClass, setClasses } from "../../utils/store/adminSlice";
import ConfirmBox from "../../components/common/ConfirmBox";

const ClassManagement = () => {

  const {classes} = useSelector(store=>store.admin)
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [title, setTitle] = useState();
  const [popup, setPopup] = useState(false); 

  const handleBlock = (blocked, id) =>{
    if (blocked) setTitle('Un block class')
    else setTitle('Block class')
    setSelected(id)
    setPopup(true)
  }

  const handleConfirm = () => {
    dispatch(blockAndUnblockClass(selected))
    adminServices.blockAndUnblockClass(selected);
  }

  useEffect(()=>{
    if(!classes){
      adminServices.findAllClasses().then(res=>{
        dispatch(setClasses(res?.success?.classes))
      })
    }
  },[dispatch, classes])

  return (
    <>
    <ConfirmBox title={title} visible={popup} setVisibleFn={setPopup} accepted={handleConfirm}/>
    <div className="box p-5 overflow-x-scroll scroll rounded-md">
      <p className="text-center text-primary underline font-extrabold text-xl mb-5">Class management</p>
      <table className="w-full overflow-x-scroll scroll">
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
            <td><p className=" bg-indigo-50 py-1 rounded-md md:py-2"><span className={`p-1 text-[10px] block m-auto w-20 rounded font-bold border-2 uppercase ${singleClass.isBlocked ? 'bg-red-100 border-red-500 text-red-500': 'bg-green-100 border-green-500 text-green-500'} `}>{singleClass?.isBlocked ? 'blocked' : 'un Blocked'}</span></p></td>
            <td className="flex">
              <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>handleBlock(singleClass?.isBlocked, singleClass._id)}>Block</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
};

export default ClassManagement;