import { useFormik } from "formik";
import { assignmentInitialValue, assignmentSchema } from "../../../schema/schema";
import services from '../../../services/lectureServices'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateAssignment = ({close, addNew}) => {

  const {classId} = useParams()
  const [err, setErr] = useState()
  const [succ, setSucc] = useState()
  const [minDate, setMinDate] = useState();
  const {errors, values, handleChange, handleSubmit} = useFormik({
    initialValues: assignmentInitialValue,
    validationSchema: assignmentSchema,
    onSubmit: (values)=>{
      services.createAssignment(classId, values).then(res=>{
        if (res?.error) {
          setErr(res?.error)
          setTimeout(()=>{setErr(false)}, 2000)
        }
        if (res?.success) {
          setSucc('Created successfully')
          addNew(res.success.assignment);
          setTimeout(()=>{setErr(false); close()}, 2000)
        }
      })
    }
  })


  useEffect(()=>{
    const currentDate = new Date().toISOString().split('T')[0];
    setMinDate(currentDate)
  }, [])


  return (
    <div className="bg-tileColor rounded-md p-3">
      {err&& <p className="uppercase text-red-500">{err}</p>}
      {succ&& <p className="uppercase text-green-500">{succ}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="title" className={`text-sm p-2 ${errors?.title ? 'text-red-500' : 'text-slate-600'}`}>Title {errors?.title}</label>
          <label htmlFor="dueDate" className={`text-sm p-2 ${errors?.dueDate ? 'text-red-500' : 'text-slate-600'}`}>Due date {errors?.dueDate}</label>
          <input name="title" id="title" type="text" className={` py-1 px-3 rounded outline-none border-b-2 border-b-primary`} values={values.title} onChange={handleChange}/>
          <input name="dueDate" id="dueDate" type="date" className={` py-1 px-3 rounded outline-none border-b-2 border-b-primary`}  values={values.dueDate} onChange={handleChange} min={minDate} />
        </div>
        <div className="mt-2">
          <label htmlFor="description" className={`text-sm p-2 mb-2 ${errors?.description ? 'text-red-500' : 'text-slate-600'}`}>Description {errors?.description}</label>
          <textarea name="description" id="description" rows="8" className={`w-full mt-2 p-3 tracking-wider rounded outline-none border-b-2 border-b-primary text-slate-600"`} values={values.description} onChange={handleChange} ></textarea>
        </div>
        <button type="button" className="btn overflow-hidden bg-black rounded-md mr-5 text-white" onClick={close}>cancel</button>
        <button type="submit" className="btn overflow-hidden bg-primary rounded-md text-white">submit</button>
      </form>
     {/* <div className="box"></div> */}
    </div>
  )
};

export default CreateAssignment;