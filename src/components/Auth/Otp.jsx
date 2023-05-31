import { useFormik } from 'formik';
import ErrorMessage from '../common/ErrorMessage';
import FormInput from '../common/FormInput';
import PasswordIcon from '@mui/icons-material/Password';
import { useEffect, useState } from 'react';
import { otpSchema } from '../../schema/schema';
import { deleteLocalStorageItem } from '../../utils/storageHelper';

const Otp = ({setOtpRequested}) => {
  const [btn, setBtn] = useState('Submit');
  const [count, setCount] = useState(0)
  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues: { otp: 0 },
    validationSchema: otpSchema,
    onSubmit: ({ otp }) => {
      setBtn('Submitting..')
    },
  });
  const message = errors.otp;
  let timer;
  const counter = ()=>{
    let i = 30
     timer = setInterval(() => {
     setCount(i--)
    }, 1000);
    setTimeout(()=>{
      setCount(0)
      clearInterval(timer)}, 30000)
  }

  useEffect(()=>{
    counter()
    return ()=>{
      clearInterval(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const goBack=()=>{
    deleteLocalStorageItem('otp')
    setOtpRequested(false)
  }
  const reSendOtp = ()=>{
    counter()
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-[3rem] text-center text-textColor">
          Enter Otp
          </h3 >
        <p className="text-center text-textColor mb-3">
          Join our community of learners{' '}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <FormInput
            values={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Confirm password"
            id="otp"
            type="number"
            name="otp"
            placeholder="enter your OTP"
            icon={<PasswordIcon />}
          />
          <ErrorMessage message={message} />
          <button
            type="submit"
            className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase"
          >
            {btn}
          </button>
        </form>
        <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
          <button onClick={goBack}>I wanna make changes</button> 
          {count ? "resend otp after " + count : <button onClick={reSendOtp}>Resend Otp</button>}
        </div>
      </div>
    </>
  );
};

export default Otp;
