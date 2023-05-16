import AuthLayout from '../components/Auth/AuthLayout';
import Login from '../components/Auth/Login';
import Basic from '../components/Auth/test';

const authRoute = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'signup'}],
};

export default authRoute;