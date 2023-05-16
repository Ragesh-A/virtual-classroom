import * as Yup from 'yup';

const emailOrPhoneSchema = Yup.string().test('emailOrPhone', 'Invalid email or phone number', function (value) {
  if (!value) {
    return false;
  }

  // Regular expressions to match email and phone number patterns
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex = /^\d{3}\d{3}\d{4}$/;

  // Check if the value matches either the email or phone number pattern
  return (emailRegex.test(value) || phoneRegex.test(value));
});



export const loginSchema = Yup.object({
  emailOrPhone: emailOrPhoneSchema.required('Email or phone number is required'),
  password : Yup.string().min(5, 'password should at least 5 character').required('please enter the password'),
})