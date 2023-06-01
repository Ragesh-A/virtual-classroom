import * as Yup from 'yup';


// Regular expressions to match email and phone number patterns
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^\d{3}\d{3}\d{4}$/;

const emailOrPhoneSchema = Yup.string().test('emailOrPhone', 'Invalid email or phone number', function (value) {
  if (!value) {
    return false;
  }

  // Check if the value matches either the email or phone number pattern
  return (emailRegex.test(value) || phoneRegex.test(value));
});


// login schema
export const loginInitialValues = { emailOrPhone: '', password: '' }
export const loginSchema = Yup.object({
  emailOrPhone: emailOrPhoneSchema.required('Email or phone number is required'),
  password : Yup.string().min(5, 'password should at least 5 character').required('please enter the password'),
})

// sign up schema
export const SignUpInitialValues = {
  name: '',
  emailOrPhone: '',
  password: '',
  confirmPassword: '',
}
export const signUpSchema = Yup.object({
  name : Yup.string().min(2).required('Enter your name'),
  emailOrPhone : emailOrPhoneSchema.required('Email or phone number is required'),
  password : Yup.string().min(5, 'Please make the password more strong').required('Password is required'),
  confirmPassword : Yup.string().required().oneOf([Yup.ref('password')],'Password should be match')
})

// OTP schema
export const otpSchema = Yup.object({
  otp : Yup.number().min(2).required("Enter the valid otp")
})

export const isPhoneNumber = (value)=>{
  return phoneRegex.test(value)
}

// Forgot password 
export const forgotPasswordInitialValues = {
  1 : { emailOrPhone : '', },
  2 : { otp : 0, },
  3 : {
    password : '',
    confirmPassword : '',
  },
}

export const forgotPasswordSchema = {
  1 :  Yup.object({
    emailOrPhone : emailOrPhoneSchema.required('email or phone number is required')
  }),
  2 :  Yup.object({
    otp : Yup.number().min(2).required('valid otp is required')
  }),
  3 :  Yup.object({
    password: Yup.string().min(5, 'make it stronger password').required('Password is required'),
    confirmPassword : Yup.string().required().oneOf([Yup.ref('password')], 'both password should be match')
  }),
  
}

export const createClassInitialValues =  {
  name: '',
  section: '',
  description: '',
  image: null,
}

export const createClassSchema = Yup.object({
  name: Yup.string().min(2, 'class name at least 2 character').required('class name is required'),
  section: Yup.string(),
  description: Yup.string(),
  image: Yup.mixed().nullable(),
})

export const assignmentInitialValue = {
  title: '',
  description: ''
}

export const assignmentSchema = Yup.object({
  title: Yup.string().min(5, 'at least five character should be there').required('is required'),
  dueDate: Yup.string().required('is required'),
  description: Yup.string().min(10, 'should be more detailed').required('is required')
})