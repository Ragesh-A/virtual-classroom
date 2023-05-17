import AuthLayout from '../components/Auth/AuthLayout';
import ForgotPassword from '../components/Auth/ForgotPassword';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

const authRoute = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'signup', element : <SignUp />},
    { path : 'forgot-password', element: <ForgotPassword />}],
};

export default authRoute;