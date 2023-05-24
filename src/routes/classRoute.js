import PrivateRoute from '../components/PrivateRoute';
import AllClasses from '../components/classroom/common/AllClasses';
import DiscussionPanel from '../components/classroom/common/DiscussionPanel';
import Profile from '../components/common/Profile';
import ClassesLayout from '../components/layouts/ClassesLayout';
import ClassroomLayout from '../components/layouts/ClassroomLayout';

export const allClassRoute = {
  path: '/',
  element: (
    <PrivateRoute>
      <ClassesLayout />
    </PrivateRoute>
  ),
  children: [
    { path: '/', element: <AllClasses /> },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export const classRoute = {
  path: '/class/:classId',
  element: (
    <PrivateRoute>
      <ClassroomLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: '',
      element: <DiscussionPanel />,
    },
  ],
};
