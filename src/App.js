import { createBrowserRouter } from 'react-router-dom';
import authRoute from './routes/authRoutes';
import { allClassRoute, classRoute } from './routes/classRoute';
import adminRoute from './routes/adminRoute';
import organizerRoute from './routes/organizerRoute';
import Home from './components/common/home/Home';
import verifyRoute from './routes/verification.routes';

const App = createBrowserRouter([
  authRoute,
  allClassRoute,
  classRoute,
  { path: '/home', element: <Home /> },
  adminRoute,
  organizerRoute,
  verifyRoute,
  { path: '*', element: <>404</> },
]);

export default App;
