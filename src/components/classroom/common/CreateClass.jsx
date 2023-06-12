import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useForm from '../../../utils/formHelper';
import ErrorMessage from '../../common/ErrorMessage';
import JoinClassInput from '../../common/JoinClassInput';
import classServices from '../../../services/classServices';
import { addClass } from '../../../utils/store/classesSlice';
import CreateClassInput from '../../common/CreateClassInput';
import {
  createClassInitialValues,
  createClassSchema,
} from '../../../schema/schema';
import Button from '../../common/Button'
import { setNotification } from '../../../utils/store/uiSlice';

const CreateClass = ({ visible, setVisible }) => {
  const [isJoin, setIsJoin] = useState(true);
  const dispatch = useDispatch();

  const { formik, isSubmitting } = useForm(
    createClassInitialValues,
    createClassSchema,
    onSubmit
  );
  async function onSubmit(values) {
   const res = await  classServices.createClass(values)
    if (res?.success) {
      dispatch(addClass(res.success));
      dispatch(setNotification({success: true, message: 'class created '}))
      setVisible(false)
    }else{
      dispatch(setNotification({success: false, message: res.error}))
      
    }
    
  }

  return (
    <>
      {visible && (
        <div className="fixed top-0 left-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5 transition-colors">
          <div
            id="pop"
            className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg"
          >
            <div className=" flex w-full justify-end pe-3">
              <i
                className="fa-solid fa-xmark text-[2rem] text-white cursor-pointer my-2 hover:animate-spin"
                onClick={() => setVisible(false)}
              ></i>
            </div>
            <div className="bg-white rounded-t-lg p-5 transition">
              <ul className="flex gap-3 font-bold text-textColor">
                <li
                  className={`cursor-pointer ${
                    isJoin ? 'border-b-[3px] border-primary' : ''
                  }`}
                  onClick={() => setIsJoin(true)}
                >
                  Join class
                </li>
                <li
                  className={`cursor-pointer ${
                    isJoin ? '' : 'border-b-[3px] border-primary'
                  }`}
                  onClick={() => setIsJoin(false)}
                >
                  Create class
                </li>
              </ul>
              {isJoin ? (
                <JoinClassInput setVisible={setVisible} />
              ) : (
                <Form onSubmit={formik.handleSubmit} className="flex flex-col">
                  <CreateClassInput
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <CreateClassInput
                    name="section"
                    onChange={formik.handleChange}
                    value={formik.values.section}
                  />
                  <CreateClassInput
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  <input
                    name="image"
                    id="image"
                    type="file"
                    accept="image/*"
                    className="bg-gray-200 border-gray-300 outline-primary w-full py-1 focus:bg-blue-50 file:bg-violet-50 file:text-primary file:border-0 file:rounded file:px-3 file:py-2 file:font-bold  bg-transparent border-0"
                    onChange={(e) =>
                      formik.setFieldValue('image', e.target.files[0])
                    }
                  />
                  <ErrorMessage message={formik?.errors?.name} />
                  
                  <Button type='submit' loading={isSubmitting} className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-1 py-1 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase " >Create class</Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClass;
