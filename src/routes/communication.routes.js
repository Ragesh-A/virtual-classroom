import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/video-conference/Home';
import MeetUp from '../pages/video-conference/MeetUp';
import VideoConference from '../pages/video-conference/VideoConference';

const meetUp = {
	path: '/meetup',
	element: (
		<PrivateRoute>
			<MeetUp />
		</PrivateRoute>
  ),
  children: [{
    path: '',
    element: <Home />
  },
    {
      path: ':meetupId', 
      element:  <VideoConference /> ,
  }]
};

export default meetUp;
