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
    <div className="box rounded-md p-2 md:p-5 overflow-x-scroll text-[10px]">
      <p className="text-center text-primary underline font-extrabold text-md md:text-xl my-2 md:mb-5">User management</p>
      <table className="w-full overflow-x-scroll">
        <thead className="text-[10px] md:text-xl rounded-full overflow-hidden bg-primary text-white">
          <tr>
            <th className="p-1 md:p-2">ID</th>
            <th className="p-1 md:p-2"><span className="hidden md:inline">User </span> Name</th>
            <th className="p-1 md:p-2">Email</th>
            <th className="p-1 md:p-2">Status</th>
            <th className="p-1 md:p-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center md:mt-1">
          {users && users?.map((user, index)=>(
            <tr key={user._id} className={`text-[10px] md:text-[16px] font-mono ${index % 2 !== 0 && 'bg-gray-100'}`}>
            <td>{index + 1}</td>
            <td className="capitalize">{user.name}</td>
            <td>{user.emailOrPhone}</td>
            {/* clas{` md:py-2 text-[10px] block `} */}
            <td><span className={`rounded block m-auto w-20 md:w-32 py-1 font-bold ${user.isBlocked ? 'bg-red-100 text-red-500': 'bg-green-100 text-green-500'}  uppercase`}>{user?.isBlocked ? 'Blocked' : 'Un Blocked'}</span></td>
            <td>
              <button className="bg-lightPrimary hover:bg-primary text-white p-1 font-bold md:p-2 rounded w-full" onClick={()=>handleBlock(user._id)}>Block</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default UserManagement;