import AuthLayout from "../components/Auth/AuthLayout";

const authRoute = {
  path : '/auth',
  element : <AuthLayout />,
  Children : [
    {path : '/login'},
    {path : 'signup'}
  ]
}

export default authRoute;