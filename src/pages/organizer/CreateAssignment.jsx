import { useFormik } from "formik";
import { assignmentInitialValue, assignmentSchema } from "../../schema/schema";
import services from '../../services/assignmentServices'
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateAssignment = ({close}) => {

  const {classId} = useParams()
  const [err, setErr] = useState()
  const [succ, setSucc] = useState()
  const {classes} = useSelector(store=>store.organizer)
  const {errors, values, handleChange, handleSubmit} = useFormik({
    initialValues: {...assignmentInitialValue, classId: [] },
    validationSchema: assignmentSchema,
    onSubmit: (values)=>{
      services.createBulkAssignment(classId, values).then(res=>{
        if (res?.error) {
          setErr(res?.error)
          setTimeout(()=>{setErr(false)}, 2000)
        }
        if (res?.success) {
          setSucc('Created successfully')

          setTimeout(()=>{setErr(false); close()}, 2000)
        }
      })
    }
  })
  return (
    <div className="bg-tileColor rounded-md p-3 w-1/2">
      {err&& <p className="uppercase text-red-500">{err}</p>}
      {succ&& <p className="uppercase text-green-500">{succ}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="title" className={`text-sm p-2 ${errors?.title ? 'text-red-500' : 'text-slate-600'}`}>Title {errors?.title}</label>
          <label htmlFor="dueDate" className={`text-sm p-2 ${errors?.dueDate ? 'text-red-500' : 'text-slate-600'}`}>Due date {errors?.dueDate}</label>
          <input name="title" id="title" type="text" className={` py-1 px-3 rounded outline-none border-b-2 border-b-primary`} values={values.title} onChange={handleChange}/>
          <input name="dueDate" id="dueDate" type="date" className={` py-1 px-3 rounded outline-none border-b-2 border-b-primary`}  values={values.dueDate} onChange={handleChange}/>
        </div>
        <div className="mt-2">
          <label htmlFor="description" className={`text-sm p-2 mb-2 ${errors?.description ? 'text-red-500' : 'text-slate-600'}`}>Description {errors?.description}</label>
          <textarea name="description" id="description" rows="8" className={`w-full mt-2 p-3 tracking-wider rounded outline-none border-b-2 border-b-primary text-slate-600"`} values={values.description} onChange={handleChange} ></textarea>
        </div>
        <div className="flex flex-wrap gap-3">
        {classes&&classes.map(single=>(
          <div className="flex gap-1 items-center" key={single._id}>
          <input type="checkbox" name='classId' id={single.name} value={single._id} checked={values.classId.includes(single._id)} onChange={handleChange}/>
          <label htmlFor={single.name}>{single.name}</label>
        </div>
        ))}
        </div>
        <button type="button" className="btn overflow-hidden bg-black rounded-md mr-5 text-white mt-2 px-4 py-1" onClick={close}>cancel</button>
        <button type="submit" className="btn overflow-hidden bg-primary rounded-md text-white mt-2 px-4 py-1">submit</button>
      </form>
     {/* <div className="box"></div> */}
    </div>
  )
};

export default CreateAssignment;