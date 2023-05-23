import { useState } from "react";
import JoinClassInput from "../common/JoinClassInput";
import CloseIcon from '@mui/icons-material/Close';
import CreateClassInput from "../common/CreateClassInput";
import { Form } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import useForm from "../../utils/formHelper";
import { createClassInitialValues, createClassSchema } from "../../schema/schema";
import classServices from "../../services/classServices";

const CreateClass = ({visible, setVisible}) => {

  const [isJoin, setIsJoin] = useState(true)
  const [formError, setFormError] = useState(false)

  const {formik, isSubmitting} = useForm(createClassInitialValues, createClassSchema, onSubmit)
  function onSubmit (values) {
    console.log(values)
    classServices.createClass(values)
  }
  if(formik.errors?.name){
    setTimeout(() => {
      setFormError(false)
    }, 2000);
  }
  

  return (
    <>
    {visible && <div className="absolute top-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5">
      <div className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg transition">
        <div className=" flex w-full justify-end pe-3">
        <CloseIcon className="text-white cursor-pointer my-2" sx={{fontSize: '2rem'}} onClick={()=> setVisible(false)}/>
        </div>
        <div className="bg-white rounded-t-lg p-5 transition">
            <ul className="flex gap-3 font-bold text-textColor">
              <li className={`cursor-pointer ${isJoin ? 'border-b-[3px] border-primary' : ''}`} onClick={()=> setIsJoin(true)}>Join class</li>
              <li className={`cursor-pointer ${isJoin ? '' : 'border-b-[3px] border-primary'}`} onClick={()=> setIsJoin(false)}>Create class</li>
            </ul>
          {isJoin ? <JoinClassInput /> : <Form onSubmit={formik.handleSubmit}>
          <CreateClassInput name='name' onChange={formik.handleChange} value={formik.values.name}/>
          <CreateClassInput name='section' onChange={formik.handleChange} value={formik.values.section}/>
          <CreateClassInput name='description' onChange={formik.handleChange} value={formik.values.description}/>
          {/* <input name='image' id='image' type='file' accept="image/*" className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0" onChange={e=> formik.setFieldValue('image', e.target.files[0])}/> */}
          <ErrorMessage message={formik?.errors?.name} />
          <button
            type="submit"
            className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase"
          ></button>
          </Form>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default CreateClass;