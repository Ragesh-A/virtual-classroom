import { useFormik } from 'formik';
import {
  assignmentInitialValue,
  assignmentSchema,
} from '../../../schema/schema';
import services from '../../../services/lectureServices';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import exa from '../../../assets/images/exams.png'

const CreateAssignment = ({ close, addNew }) => {
  const { classId } = useParams();
  const [err, setErr] = useState();
  const [succ, setSucc] = useState();
  const [minDate, setMinDate] = useState();
  const [addImage, setAddImage] = useState();
  const { errors, values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: assignmentInitialValue,
    validationSchema: assignmentSchema,
    onSubmit: (values) => {
      services.createAssignment(classId, values).then((res) => {
        if (res?.error) {
          setErr(res?.error);
          setTimeout(() => {
            setErr(false);
          }, 2000);
        }
        if (res?.success) {
          setSucc('Created successfully');
          addNew(res.success.assignment);
          setTimeout(() => {
            setErr(false);
            close();
          }, 2000);
        }
      });
    },
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setMinDate(currentDate);
  }, []);

  const handelImage = async (e) => {
    const file = e.target.files[0];
    setFieldValue('image', file)
    const imageUrl = URL.createObjectURL(file)
    setAddImage(imageUrl)
  }

  return (
    <div className="bg-tileColor rounded-md p-3">
  {err && <p className="uppercase text-red-500">{err}</p>}
  {succ && <p className="uppercase text-green-500">{succ}</p>}
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-2 gap-2">
      <label htmlFor="title" className={`text-sm p-2 ${ errors?.title ? 'text-red-500' : 'text-slate-600' }`}>
        Title {errors?.title}
      </label>
      <label htmlFor="dueDate" className={`text-sm p-2 ${ errors?.dueDate ? 'text-red-500' : 'text-slate-600' }`}>
        Due date {errors?.dueDate}
      </label>
      <input name="title" id="title" type="text" className={` py-1 px-3 rounded outline-none border-b-2
        border-b-primary`} values={values.title} onChange={handleChange} />
      <input name="dueDate" id="dueDate" type="date" className={` py-1 px-3 rounded outline-none border-b-2
        border-b-primary`} values={values.dueDate} onChange={handleChange} min={minDate} />
    </div>
    <div className="mt-2">
      <label htmlFor="description" className={`text-sm p-2 mb-2 ${ errors?.description ? 'text-red-500'
        : 'text-slate-600' }`}>
        Description {errors?.description}
      </label>
      <div className="flex gap-2 flex-col-reverse md:flex-row">
        <textarea name="description" id="description" rows="8" className={`w-full font-mono mt-2 p-3 tracking-wider
          rounded outline-none border-b-2 border-b-primary text-slate-600"`} values={values.description}
          onChange={handleChange}></textarea>
        {addImage && addImage !== true && <div className="pt-2">
          <img src={addImage  || exa} alt="reference" className='max-w-[350px] overflow-hidden rounded-md' />
        </div>}
      </div>
    </div>
    <div className="flex flex-col md:flex-row mt-1  justify-between">
      <div className="flex items-center">
        <label htmlFor="image"
          className="bg-lightPrimary text-white p-2 px-5  rounded-full gap-3 my-1  flex items-center justify-center min-h-[40px] min-w-[40px]"
          onClick={()=> setAddImage(true)}
          >
          <i className="ri-image-add-line"></i>
          <span>add reference</span>
        </label>
        <input name="image" id="image" type="file" accept="image/*"
          className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0 hidden"  onChange={handelImage} />
      </div>
      <div className="">
        <button type="button" className="btn overflow-hidden bg-gray-700 hover:bg-black rounded-full mr-5 text-white " onClick={close}>
          cancel
        </button>
        <button type="submit" className="btn overflow-hidden bg-indigo-500 hover:bg-primary rounded-full text-white">
          Assign
        </button>
      </div>
    </div>
  </form>
  {/* <div className="box"></div> */}
</div>
  );
};

export default CreateAssignment;
