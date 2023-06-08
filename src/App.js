import { createBrowserRouter } from 'react-router-dom';
import authRoute from './routes/authRoutes';
import { allClassRoute, classRoute } from './routes/classRoute';
import adminRoute from './routes/adminRoute';
import organizerRoute from './routes/organizerRoute';
import Home from './pages/Home';
import verifyRoute from './routes/verification.routes';
import meetUp from './routes/communication.routes';
import VideoConference from './pages/video-conference/VideoConference';

const App = createBrowserRouter([
  authRoute,
  allClassRoute,
  classRoute,
  { path: '/home', element: <Home /> },
  adminRoute,
  organizerRoute,
  verifyRoute,
  meetUp,
  {path: '/meetup/:meetupId', element: <VideoConference />},
  { path: '*', element: <>404</> },
]);

export default App;
