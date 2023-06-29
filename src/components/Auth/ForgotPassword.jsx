import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormInput from '../common/FormInput';
import {
  forgotPasswordInitialValues,
  forgotPasswordSchema,
} from '../../schema/schema';
import { useFormik } from 'formik';
import authServices from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';
import Button from '../common/Button';

let data = {};

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  let [count, setCount] = useState(30);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoading] = useState(false);
  const [resend, setResend] = useState(false);

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: forgotPasswordInitialValues[currentStep],
      validationSchema: forgotPasswordSchema[currentStep],
      onSubmit: async (values) => {
        setLoading(true);
        await testValidation(values);
      },
    });

  let message;
  if (currentStep === 1 && touched.emailOrPhone && errors.emailOrPhone) {
    message = errors.emailOrPhone;
  } else if (currentStep === 2 && touched.otp && errors.otp) {
    message = errors.otp;
  }

  useEffect(() => {
    if (message) {
      dispatch(setNotification({ success: false, message }));
    }
  }, [dispatch, message, touched]);

  function testValidation(value) {
    switch (currentStep) {
      case 1:
        data.emailOrPhone = value.emailOrPhone;
        authServices.requestResetOtp(value.emailOrPhone).then((res) => {
          setLoading(false);
          if (res.error) {
            dispatch(setNotification({ success: false, message: res.error }));
          } else if (res.success) {
            dispatch(setNotification({ success: true, message: res.success }));
            setCurrentStep(2);
          }
        });
        break;
      case 2:
        data = { ...data, otp: value.otp };
        authServices.verifyOtp(data.emailOrPhone, data.otp).then((res) => {
          setLoading(false);
          if (res?.success) {
            setCurrentStep(3);
          } else {
            dispatch(setNotification({ success: false, message: res?.error }));
          }
        });
        break;
      case 3:
        data = { ...data, password: value.password };
        authServices.resetPassword(values).then((res) => {
          setLoading(false);
          if (res.success) {
            dispatch(setNotification({ success: true, message: res.success }));
            navigate('/auth/login');
          } else if (res.error) {
            dispatch(setNotification({ success: false, message: res.error }));
          }
        });
        break;
      default:
        setCurrentStep(1);
    }
  }

  let timer;
  const counter = () => {
    timer = setInterval(() => {
      setCount(count--);
      if (count <= 0) {
        setCount(30);
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setResend(true);
    }, 30020);
  };

  useEffect(() => {
    if (currentStep === 2) {
      counter();
    }
    return () => {
      clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const reSendOtp = () => {
    setResend(false);
    counter();
    authServices.requestResetOtp(data?.emailOrPhone).then((res) => {
      if (res.success) {
        dispatch(setNotification({ success: true, message: res.success }));
      } else if (res.error) {
        dispatch(setNotification({ success: false, message: res.error }));
      }
    });
  };

  return (
    <div className="relative z-[1] h-full md:grid grid-cols-2 gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl md:text-[3rem] text-center text-textColor md:mb-5">
          Reset password
        </h3>
        <p className="text-center text-sm md:text-base text-textColor mb-3">
          Reset the password and make it strong
        </p>

        <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <FormInput
              onChange={handleChange}
              values={values.emailOrPhone}
              onBlur={handleBlur}
              label="Email"
              id="emailOrPhone"
              type="email"
              name="emailOrPhone"
              placeholder="enter phone or email"
              icon={<i className="ri-mail-lock-fill text-xl"></i>}
            />
          )}
          {currentStep === 2 && (
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.otp}
              label="Otp"
              id="otp"
              name="otp"
              type="number"
              placeholder="enter the otp"
              icon={<i className="ri-shield-keyhole-line text-xl font-bold"></i>}
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
                icon={<i className="ri-key-line font-bold text-xl"></i>}
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
                icon={<i class="ri-lock-password-fill font-bold text-xl"></i>}
              />
            </>
          )}

          <Button
            type="submit"
            loading={load}
            className="mt-2 bg-primary hover:bg-indigo-600 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase"
          >
            SENT
          </Button>
        </form>

        <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
          {currentStep === 1 && (
            <Link to="/auth/signup">I do have an account</Link>
          )}
          <Link to="/auth/login">yeah i remember</Link>
          {currentStep === 2 ? (
            !resend ? (
              'resend otp after ' + count
            ) : (
              <button onClick={reSendOtp} className='text-left'>Resend Otp</button>
            )
          ) : null}
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
