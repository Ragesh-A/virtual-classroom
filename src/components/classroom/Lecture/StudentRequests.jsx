const StudentsRequests = ({requests = [], handleAccept, handleRemove}) => {
 
  return (
    <>
    {requests.map(student=>(
      <div className="bg-tileColor transitions shadow-inner hover:shadow border-white border-2 p-3 flex justify-between items-center mb-2 rounded-md" key={student._id}>
      <div className="flex items-center gap-5">
        <img  src={''} alt="" width="70px" height="70px" />
        <p className="font-bold  text-textColor">{student.name}</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-white text-textColor font-bold text-sm px-3 py-2 rounded hover:shadow hover:shadow-shadow" onClick={()=>handleRemove(student._id)}>
          Remove
        </button>
        <button className="bg-primary border-2 border-primary  text-white font-bold text-sm px-5 py-2 rounded hover:shadow hover:bg-white hover:text-primary hover:border-primary" onClick={()=>handleAccept(student._id)}>
          Accept
        </button>
      </div>
    </div>
    ))}
    </>
  )
};

export default StudentsRequests;