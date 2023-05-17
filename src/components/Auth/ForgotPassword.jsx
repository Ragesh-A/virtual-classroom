import { Link } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';
import { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/storageHelper';
import FormInput from '../common/FormInput';
import KeyIcon from '@mui/icons-material/Key';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import { isPhoneNumber } from '../../schema/schema';
import {
  forgotPasswordInitialValues,
  forgotPasswordSchema,
} from '../../schema/schema';
import { useFormik } from 'formik';

const ForgotPassword = () => {
  const [send, setSend] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Sent');
  const [currentStep, setCurrentStep] = useState(1);


  
  console.log('render')

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: forgotPasswordInitialValues[currentStep],
      validationSchema: forgotPasswordSchema[currentStep],
      onSubmit: (values) => {
        testValidation(values)
      },
    });
  
  let message;
    if(touched.emailOrPhone && currentStep === 1 && errors.emailOrPhone){
      message = errors.emailOrPhone
    }
    else if(touched.otp && currentStep === 2 && errors.otp ){
      message = errors.otp
    }
    else if(touched.password && errors.password){
      message = errors.password
    }
    else if(touched.confirmPassword && errors.confirmPassword){
      message = errors.confirmPassword
    }

  function testValidation(value){
    switch(currentStep){
      case 1 : 
      if(isPhoneNumber(value.emailOrPhone)){
        setCurrentStep(2)
      }
       ;break;
      case 2 : setCurrentStep(3);break;
      case 3 : ;break;
      default: setCurrentStep(1);
    }
  }
  
  return (
    <div className="relative z-[1] h-full md:grid grid-cols-2 gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-[3rem] text-center text-textColor">
          Reset password
        </h3>
        <p className="text-center text-textColor mb-3">
          Reset the password and make it strong
        </p>

        <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <FormInput
              onChange={handleChange}
              values={values.emailOrPhone}
              onBlur={handleBlur}
              label="Email or Phone"
              id="emailOrPhone"
              type="text"
              name="emailOrPhone"
              placeholder="enter phone or email"
              icon={<PhoneIphoneIcon />}
            />
          )}
          {currentStep === 2 && (
            <FormInput 
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.otp}
            label='Otp'
            id='otp'
            name='otp'
            placeholder='enter the otp'
            icon={<SafetyCheckIcon />}
            />
          )}
          {currentStep === 3 && (
            <>
              <FormInput
                onChange={handleChange}
                values={values.password}
                onBlur={handleBlur}
                label="Password"
                id="password"
                type="password"
                name="password"
                placeholder="enter the password"
                icon={<KeyIcon />}
              />
              <FormInput
                onChange={handleChange}
                values={values.confirmPassword}
                onBlur={handleBlur}
                label="Confirm password"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="confirm the password"
                icon={<LockPersonIcon />}
              />
            </>
          )}
          <ErrorMessage message={message} />
          <button
            type="submit"
            className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase"
          >
            {btnTitle}
          </button>
        </form>

        <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
          <Link to="/auth/signup">I do have an account</Link>
          <Link to="/auth/login">Yeah i remember</Link>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center">
        <p className="font-bold text-2xl mb-4 xl:text-[3rem]">
          Forgot password!
        </p>
        <p className="text-center">Don't worry we got you covered.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
