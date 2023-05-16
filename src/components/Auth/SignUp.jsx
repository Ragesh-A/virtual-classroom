import { Link } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import FormInput from "../common/FormInput";
import KeyIcon from '@mui/icons-material/Key';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/schema";
import PersonIcon from '@mui/icons-material/Person';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const initialValues ={
  name : '',
  emailOrPhone: '',
  password : '',
  confirmPassword : ''
}

const SignUp = ()=>{

  const [send, setSend] = useState(false);
  const [sign, setSign] = useState("Sign up")

  const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
    initialValues : initialValues,
    validationSchema : signUpSchema,
    onSubmit: ()=>{
      if(!send){
        setSend(true)
        setSign('sending..')
        setTimeout(()=>{
          setSign('sign up')
          setSend(false)
        }, 5000)
      }
    }

  })

  let message = (
    (touched.name && errors.name) ||
    (touched.emailOrPhone && errors.emailOrPhone) ||
     (touched.password && errors.password) ||
     (touched.confirmPassword && errors.confirmPassword)
  )
return(
  <div className="relative z-[1] h-full md:grid grid-cols-2 gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-[3rem] text-center text-textColor">Sign up</h3>
        <p className="text-center text-textColor mb-3">Join our community of learners</p>
        
          <form className='flex flex-col w-full max-w-md' onSubmit={handleSubmit}>

            <FormInput  
            values={values.name} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            label='Email or Phone' 
            id='name' 
            type="text" 
            name="name" 
            placeholder="enter your name" 
            icon={<PersonIcon />} 
            />
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
            <FormInput 
            values={values.confirmPassword} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            label='Confirm password' 
            id='confirmPassword' 
            type="password" 
            name="confirmPassword"  
            placeholder="confirm the password" 
            icon={<LockPersonIcon />} 
            />
            <ErrorMessage message={message}/>
           <button type="submit" className="mt-2 btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase" > {sign} </button>
          </form>
        
        <div className=" flex justify-between mt-3 w-full max-w-md flex-col sm:flex-row">
          <Link to="/auth/login">I do have an account</Link>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center">
        <p className="font-bold text-2xl mb-4 xl:text-[3rem]">Greetings</p>
        <p className="text-center">
        you'll have access to all the tools and resources you need to succeed in your academic journey
        </p>
      </div>
    </div>
)
}

export default SignUp;