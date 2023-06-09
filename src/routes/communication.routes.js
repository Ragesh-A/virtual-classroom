import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/video-conference/Home'

const meetUp = {
  path: '/meetup',
  element: <PrivateRoute>
    <Home />
  </PrivateRoute>
}

export default meetUp;