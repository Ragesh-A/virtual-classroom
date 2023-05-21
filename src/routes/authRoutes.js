import AuthLayout from '../components/layouts/AuthLayout';
import EmailVerification from '../components/Auth/EmailVerification';
import ForgotPassword from '../components/Auth/ForgotPassword';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

const authRoute = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'signup', element : <SignUp />},
    { path: 'forgot-password', element: <ForgotPassword />},
    { path: 'verify-email/:userId/:uuid', element: <EmailVerification /> }
  ]
}

export default authRoute;