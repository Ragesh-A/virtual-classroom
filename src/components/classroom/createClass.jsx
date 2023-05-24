import { useState } from "react";
import JoinClassInput from "../common/JoinClassInput";
import CloseIcon from '@mui/icons-material/Close';
import CreateClassInput from "../common/CreateClassInput";
import { Form } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import useForm from "../../utils/formHelper";
import { createClassInitialValues, createClassSchema } from "../../schema/schema";
import classServices from "../../services/classServices";
import { useDispatch } from "react-redux";
import { addClass } from "../../utils/store/classesSlice";
import { motion, AnimatePresence } from "framer-motion";

const CreateClass = ({visible, setVisible}) => {

const [isJoin, setIsJoin] = useState(true)
const [formError, setFormError] = useState(false)
const dispatch = useDispatch()

const {formik, isSubmitting} = useForm(createClassInitialValues, createClassSchema, onSubmit)
function onSubmit (values) {
console.log(values)
classServices.createClass(values).then(res=>{
if(res?.success){
dispatch(addClass(res.success))
}
})
}

if(formik.errors?.name){
setTimeout(() => {
setFormError(false)
}, 2000);
}


return (
<>
  {visible &&
  <AnimatePresence>
    <motion.div
      className="fixed top-0 left-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5 transition-colors"
      initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div id="pop" className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg">
        <div className=" flex w-full justify-end pe-3">
          <CloseIcon className="text-white cursor-pointer my-2" sx={{fontSize: '2rem' }} onClick={()=>
            setVisible(false)}/>
        </div>
        <motion.div className="bg-white rounded-t-lg p-5 transition" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <ul className="flex gap-3 font-bold text-textColor">
            <li className={`cursor-pointer ${isJoin ? 'border-b-[3px] border-primary' : '' }`} onClick={()=>
              setIsJoin(true)}>Join class</li>
            <li className={`cursor-pointer ${isJoin ? '' : 'border-b-[3px] border-primary' }`} onClick={()=>
              setIsJoin(false)}>Create class</li>
          </ul>
          {isJoin ?
          <JoinClassInput /> : <Form onSubmit={formik.handleSubmit} className="flex flex-col">
            <CreateClassInput name='name' onChange={formik.handleChange} value={formik.values.name} />
            <CreateClassInput name='section' onChange={formik.handleChange} value={formik.values.section} />
            <CreateClassInput name='description' onChange={formik.handleChange} value={formik.values.description} />
            {/* <input name='image' id='image' type='file' accept="image/*"
              className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0"
              onChange={e=> formik.setFieldValue('image', e.target.files[0])}/> */}
            <ErrorMessage message={formik?.errors?.name} />
            <button type="submit"
              className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-1 py-1 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase ">Create
              class</button>
          </Form>}
        </motion.div>
    </div>
      </motion.div>
  </AnimatePresence>
  }
</>
)
}

export default CreateClass;