import { useFormik } from 'formik';
import {
  assignmentSchema,
} from '../../schema/schema';
import services from '../../services/lectureServices';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import exa from '../../assets/images/exams.png'
import lectureServices from '../../services/lectureServices';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';
import { IMAGE_PATH } from '../../constant/constant';

const EditAssignment = () => {

  const dispatch = useDispatch()
  const [minDate, setMinDate] = useState();
  const [addImage, setAddImage] = useState();
  const { classId, assignmentId } = useParams()
  const [assignment, setAssignment] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setMinDate(currentDate);
    lectureServices.getAssignment(classId, assignmentId).then(res=>{
      if (res?.success) {
        setAssignment(res.success?.assignment)
      }
      else{
        dispatch(setNotification({ success: false, message: res.error}))
      }
    })
  }, [assignmentId, classId, dispatch]);

  const { errors, values, handleChange, handleSubmit, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: { title: assignment?.title, description: assignment?.description, dueDate: assignment?.dueDate?.split('T')[0], image: assignment?.image },
    validationSchema: assignmentSchema,
    onSubmit: (values) => {
      services.updateAssignment(classId, assignmentId, values).then((res) => {
        if (res?.error) {
          dispatch(setNotification({ success: false, message: res.error}))
        }
        if (res?.success) {
          dispatch(setNotification({ success: true, message: 'assignment updated'}))
          goBack()
        }
      });
    },
  });

  

  const handelImage = async (e) => {
   try {
     const file = e.target.files[0];
    setFieldValue('image', file)
    const imageUrl = URL.createObjectURL(file)
    setAddImage(imageUrl)
   } catch (error) {}
  }
  
  function goBack() {
    navigate(-1)
  }

  return (
    <div className="bg-tileColor rounded-md p-3 h-full">
  <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between xl:pb-3'>
    <div className="">
    <div className="grid grid-cols-2 gap-2">
      <label htmlFor="title" className={`text-sm p-2 ${ errors?.title ? 'text-red-500' : 'text-slate-600' }`}>
        Title {errors?.title}
      </label>
      <label htmlFor="dueDate" className={`text-sm p-2 ${ errors?.dueDate ? 'text-red-500' : 'text-slate-600' }`}>
        Due date {errors?.dueDate}
      </label>
      <input name="title" id="title" type="text" className={` py-1 px-3 rounded outline-none border-b-2
        border-b-primary`} defaultValue={values?.title} onChange={handleChange} />
      <input name="dueDate" id="dueDate" type="date" className={` py-1 px-3 rounded outline-none border-b-2
        border-b-primary`} defaultValue={values?.dueDate} onChange={handleChange} min={minDate} />
    </div>
    <div className="mt-2">
      <label htmlFor="description" className={`text-sm p-2 mb-2 ${ errors?.description ? 'text-red-500'
        : 'text-slate-600' }`}>
        Description {errors?.description}
      </label>
      <div className="flex gap-2 flex-col-reverse md:flex-row">
        <textarea name="description" id="description" rows="8" className={`w-full font-mono mt-2 p-3 tracking-wider
          rounded outline-none border-b-2 border-b-primary text-slate-600"`} defaultValue={values?.description}
          onChange={handleChange} ></textarea>
        {(assignment?.image || addImage) && <div className="pt-2">
          <img src={ ((addImage && addImage !== true ) && addImage) || `${IMAGE_PATH}assignments/${assignment.image}`  || exa} alt="reference" className='max-w-[150px] md:max-w-[350px] overflow-hidden rounded-md' />
        </div>}
      </div>
    </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between mt-2">
      <div className="flex items-center">
        <label htmlFor="image"
          className="bg-lightPrimary text-white p-2 px-5  rounded-full gap-3 my-1  flex items-center justify-center min-h-[40px] min-w-[40px]"
          onClick={()=> setAddImage(true)}
          >
          <i className="ri-image-add-line"></i>
          <span>add reference</span>
        </label>
        <input name="image" id="image" type="file" multiple accept="image/*"
          className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0 hidden"  onChange={handelImage} />
      </div>
      <div>
        <button type="button" onClick={goBack} className="btn overflow-hidden bg-gray-700 hover:bg-black rounded-full mr-5 text-white ">
          cancel
        </button>
        <button type="submit" className="btn overflow-hidden bg-indigo-500 hover:bg-primary rounded-full text-white">
          Update
        </button>
      </div>
    </div>
  </form>
</div>
  );
};

export default EditAssignment;
