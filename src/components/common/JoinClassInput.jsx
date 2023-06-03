import { useRef, useState } from 'react';
import classServices from '../../services/classServices';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';
import Button from './Button';

const JoinClassInput = ({setVisible}) => {
  const inp = useRef();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  function formHandle(e) {
    const value = inp.current.value.trim();
    if (value) {
      classServices.joinClass(value).then(res=>{
        setIsLoading(false)
        setVisible(false)
        if(res.success){
          dispatch(setNotification({success: true, message: res.success.message}));
        }else{
          dispatch(setNotification({success: false, message: res.error}))
        }
      })
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row mt-5 gap-3 py-5">
        <p>Ask your lecture for the class code, then enter it here.</p>
        <input
          type="text"
          className="bg-gray-200 rounded border-2 border-gray-300 px-2 py-2 focus:bg-blue-50 outline-primary"
          ref={inp}
        />
      </div>
      <Button loading={isLoading} type='button' className="btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase w-full mt-9" onClick={formHandle}>Join</Button>
    </>
  );
};

export default JoinClassInput;
