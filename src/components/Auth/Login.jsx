import { useFormik } from "formik";
import { Link } from "react-router-dom";
import FormInput from '../common/FormInput'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import KeyIcon from '@mui/icons-material/Key';
import { loginSchema } from "../../schema/schema";
import ErrorMessage from "../common/ErrorMessage";
import { useState } from "react";


const initialValues = { emailOrPhone: '', password: '' };

const Login =()=>{

  const [send, setSend] = useState(false);
  const [login, setLogin] = useState("Login")

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : initialValues,
    validationSchema : loginSchema,
    onSubmit : (values)=>{
      if(!send){
        setSend(true)
        setLogin('sending..')
        console.log('send')
        setTimeout(()=>{
          setLogin('login')
          setSend(false)
        }, 5000)
      }
    }
  })

  return(
    <div className="relative z-[1] h-full md:grid grid-cols-2 gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-[3rem] text-center text-textColor"> Hello!</h3>
        <p className="text-center text-textColor mb-3">Sign into your account</p>
        
          <form className='flex flex-col w-full max-w-md' onSubmit={handleSubmit}>

            <FormInput 
            values={values.emailOrPhone} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            label='Email or Phone' 
            id='emailOrPhone' 
            type="text" 
            name="emailOrPhone" 
            placeholder="enter phone or email" 
            icon={<PhoneIphoneIcon/>} 
            />
            <FormInput 
            values={values.password} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            label='Password' 
            id='password' 
            type="password" 
            name="password"  
            placeholder="enter the password" 
            icon={<KeyIcon />} 
            />
            {console.log()}
            <ErrorMessage message={(touched.emailOrPhone && errors.emailOrPhone) || (touched.password && errors.password)}/>
           <button type="submit" className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase" > {login} </button>
          </form>
        
        <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
          <Link to="/auth/signup">I don't have an account</Link>
          <Link to="/auth/reset">forgot password</Link>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center">
        <p className="font-bold text-2xl mb-4 xl:text-[3rem]">Welcome back</p>
        <p className="text-center">
          We've missed you! Please sign in to catch up on what's new
        </p>
      </div>
    </div>
  )
}

export default Login;