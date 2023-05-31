import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';
import FormInput from '../common/FormInput';
import KeyIcon from '@mui/icons-material/Key';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import { SignUpInitialValues, isPhoneNumber, signUpSchema } from '../../schema/schema';
import PersonIcon from '@mui/icons-material/Person';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Otp from './Otp';
import { getLocalStorage, setLocalStorage } from '../../utils/storageHelper';
import authServices from '../../services/authService';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [otpRequested, setOtpRequested] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate()
  

  useLayoutEffect(()=>{
    getLocalStorage('otp').then((value)=>{
      value && setOtpRequested(true)
    })
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: SignUpInitialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        
          setLoading(true);
          authServices.signUp(values).then(res=>{
            setLoading(false)
            if(res.error){
              dispatch(setNotification({success:false, message:res.error}))
            }
            if(res.success){
              if(isOtpRequested(values.emailOrPhone)){
              }else{
                dispatch(setNotification({success: true, message: res.success }))
                navigate('/auth/login')
              }
            }

          }).catch((err)=>{setLoading(false) ;dispatch(setNotification({success:false, message: err.message}))})
          
        
      },
    });
   
  let message =
    (touched.name && errors.name) ||
    (touched.emailOrPhone && errors.emailOrPhone) ||
    (touched.password && errors.password) ||
    (touched.confirmPassword && errors.confirmPassword);

  function isOtpRequested (value){
    if(isPhoneNumber(value)){
      setOtpRequested(true);
      setLocalStorage('otp', true)
      return true;
    }
    return false;
  }
  

  return (
    <>
    <div className="relative z-[1] h-full md:grid grid-cols-2 gap-10">
      {!otpRequested ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h3 className="font-bold text-[3rem] text-center text-textColor">
            Sign up
          </h3>
          <p className="text-center text-textColor mb-3">
            Join our community of learners
          </p>

          <form
            className="flex flex-col w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <FormInput
              values={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email or Phone"
              id="name"
              type="text"
              name="name"
              placeholder="enter your name"
              icon={<PersonIcon />}
            />
            <FormInput
              values={values.emailOrPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email or Phone"
              id="emailOrPhone"
              type="text"
              name="emailOrPhone"
              placeholder="enter phone or email"
              icon={<PhoneIphoneIcon />}
            />
            <FormInput
              values={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="enter the password"
              icon={<KeyIcon />}
            />
            <FormInput
              values={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Confirm password"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="confirm the password"
              icon={<LockPersonIcon />}
            />
            <ErrorMessage message={message} />
            <Button className='bg-primary text-white' type='submit' loading={loading} >Sign Up</Button>
          </form>

          <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
            <Link to="/auth/login">I do have an account</Link>
          </div>
        </div>
      ) : (
        <Otp setOtpRequested={setOtpRequested} />
      )}

      <div className="hidden md:flex flex-col items-center justify-center">
        <p className="font-bold text-2xl mb-4 xl:text-[3rem]">Greetings</p>
        <p className="text-center">
          you'll have access to all the tools and resources you need to succeed
          in your academic journey
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
