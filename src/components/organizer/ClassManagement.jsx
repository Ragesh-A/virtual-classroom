

const ClassManagement = () => {

  const users = []
  const handleBlock = () =>{}

  return (
    <div className="box p-5 rounded">
      <p className="text-center text-primary underline font-extrabold text-xl mb-5">Classes management</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">#</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Class name</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Lecture name</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Students</span></th>
            <th className="text-white "><span className="bg-lightPrimary block rounded p-2">Action</span></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users && users?.map((user, index)=>(
            <tr key={user?._id}>
            <td><span className="py-2 bg-indigo-50 block rounded">{index + 1}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{user?.name}</span></td>
            <td><span className="py-2 bg-indigo-50 block rounded">{user?.emailOrPhone}</span></td>
            <td><span className={`py-2 block rounded font-bold border-2 ${user.isBlocked ? 'bg-red-100 border-red-500 text-red-500': 'bg-green-100 border-green-500 text-green-500'} `}>{user?.isBlocked ? 'blocked' : 'unBlocked'}</span></td>
            <td className="flex">
              <button className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full" onClick={()=>handleBlock(user?._id)}>Block</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ClassManagement;