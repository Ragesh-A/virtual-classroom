import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import organizerServices from "../../services/organizerServices";
import { setSelectedClass } from "../../utils/store/organizerSlice";
import Shimmer from "../common/Shimmer";

const SingleClassManagement = ({classid, setState}) => {
  const [active, setActive] = useState(false)
  const {selectedClass} = useSelector(store=>store.organizer);
  const [instructors, setInstructors] = useState()
  const op = useRef()
  const name = useRef()
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false)

  useEffect(()=>{
    if(!selectedClass || selectedClass?.class?._id !== classid){
      organizerServices.singleClass(classid).then(res=>{
        dispatch(setSelectedClass(res?.success?.class))
      })
      organizerServices.getInstructors().then(res=>{
        setInstructors(res?.success?.instructors)
      })
    }
    
    setTimeout(()=>{
      setActive(true)
    }, 100)
  },[])

  const handleSlider = () => { 
    setActive(false)
    setTimeout(()=>setState(false), 500)
  }
  const enableEditMode = () => {
    setEditMode(true);
  }

  const removeHandle = (studentId) => {
    organizerServices.removeFromClass(classid, studentId).then(res=>{
      console.log(res)
    })
  };

  const updateClass = (e) => {
    e.preventDefault();
    console.log(op.current.value)
    console.log(name.current.value)
    setEditMode(false)
  } 
  
  return (
    <>
      <div className={`absolute h-[80vh] w-[calc(100%-250px)]  slider top-0 right-60 pt-28 rounded ${active ? 'active': ''}`}>
        <div className={`box relative overflow-y-scroll p-5`}>
          {selectedClass?.class?._id !== classid ? <Shimmer /> :
          <form onSubmit={updateClass}>
          <div className="flex justify-end ">
          <i className="fa-solid fa-xmark hover:animate-spin cursor-pointer text-2xl" onClick={handleSlider}></i>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
            <label htmlFor="">Class Name</label>
            {!editMode &&<p className="font-bold text-2xl text-gray-600">{selectedClass?.class?.name}</p>}
            {editMode && <input type="text" defaultValue={selectedClass?.class?.name} ref={name}/>}
            </div>
            <p className="font-bold text-2xl text-gray-600">{selectedClass?.class?.uuid}</p>
          </div>
          <p className="font-bold text-primary  underline text-xl mb-3">Lecture</p>
          <div className="flex justify-between bg-indigo-100 p-1 rounded px-3 items-center">
            <p>{selectedClass?.class?.instructor.name}</p>
           {editMode && <select name="lecture" id="lecture" className="px-2 py-1 rounded-md outline-primary" ref={op}>
            <option value={selectedClass?.class?.createdBy}>You</option>
              <option value={selectedClass?.class?.instructor._id}>{selectedClass?.class?.instructor.name}</option>
              {instructors&& instructors.map(instructor=>(
                <option value={instructor._id} key={instructor._id}>{instructor.name}</option>
              ))}

            </select>}
          </div>
          <div className="">
            <p className="font-bold text-primary  underline text-xl mb-2">Students</p>
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white rounded p-1">
                  <th>#</th>
                  <th>Name</th>
                  <th>Attendance</th>
                  <th>contact</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {selectedClass?.students?.students?.map((student, index)=>(
                  <tr key={student?._id}>
                  <td>{index}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{'student'}</td>
                  <td>{'student'}</td>
                  <td><button className="bg-lightPrimary " onClick={()=>removeHandle(student._id)}>remove</button></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editMode &&  <button type="button" className="btn overflow-hidden bg-black text-white rounded-md mt-5 mr-5" onClick={()=>setEditMode(false)}>cancel</button>}
          {editMode &&  <button type="submit" className="btn bg-green-500 text-white rounded-md overflow-hidden mt-5" >save</button>}
          {!editMode && <button type="button" className="btn overflow-hidden bg-primary text-white rounded-md mt-5" onClick={enableEditMode}>Edit</button>}
          </form>}
        </div>
      </div>
    </>
  );
};

export default SingleClassManagement;
