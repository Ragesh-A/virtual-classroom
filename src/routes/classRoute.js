import PrivateRoute from '../components/PrivateRoute';
import AllClasses from '../components/classroom/common/AllClasses';
import DiscussionPanel from '../components/classroom/common/DiscussionPanel';
import Profile from '../components/common/Profile';
import ClassesLayout from '../components/layouts/ClassesLayout';
import ClassroomLayout from '../components/layouts/ClassroomLayout';
import ClassLayoutWithSidebar from '../components/layouts/ClassLayoutWithSidebar';
import lectureRoute from './lectureRoute';
import PendingAssignments from '../components/classroom/student/assignments/PendingAssignments';
import ChatHome from '../pages/chat/ChatHome';
import Works from '../components/classroom/student/assignments/Works';
import CompletedWork from '../components/classroom/student/assignments/CompletedWork';

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
    {
      path: 'works',
      element: <ClassLayoutWithSidebar />,
      children: [
        { path: '', element: <PendingAssignments /> },
        { path: 'completed', element: <CompletedWork/> },
        { path: 'missed', element: <Works filter='missed' /> },
      ],
    },
    lectureRoute,
    {
      path: 'chat-mate',
      element: <ChatHome />
    }
  ],
};
