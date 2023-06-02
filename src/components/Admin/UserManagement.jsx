import { useEffect } from "react";
import adminServices from "../../services/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { blockAndUnblock, setUser } from "../../utils/store/adminSlice";

const UserManagement = () => {

  const {users} = useSelector(store=>store.admin)
  const dispatch = useDispatch()
  const handleBlock = (id) =>{
    dispatch(blockAndUnblock(id))
    adminServices.blockOrUnblock(id);
  }

  useEffect(()=>{
    if(!users){
      adminServices.findAllUser().then(res=>{
        dispatch(setUser(res?.success?.users))
      })
    }
  },[dispatch, users])

  return (
    <div className="box p-5">
      <p className="text-center text-primary underline font-extrabold text-xl mb-5">User management</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-white "><span className="bg-primary block rounded p-2">ID</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">User Name</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Email</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Status</span></th>
            <th className="text-white "><span className="bg-primary block rounded p-2">Action</span></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users && users?.map((user, index)=>(
            <tr key={user._id}>
            <td><span className="py-2 bg-indigo-50 block rounded">{index + 1}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{user.name}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{user.emailOrPhone}</span></td>
            <td><span className={`py-2 block rounded font-bold border-2 ${user.isBlocked ? 'bg-red-100 border-red-500 text-red-500': 'bg-green-100 border-green-500 text-green-500'} `}>{user?.isBlocked ? 'blocked' : 'unBlocked'}</span></td>
            <td className="flex">
              <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>handleBlock(user._id)}>Block</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default UserManagement;