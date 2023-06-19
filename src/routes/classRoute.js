
import { Suspense, lazy } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import AllClasses from '../components/classroom/common/AllClasses';
import DiscussionPanel from '../components/classroom/common/DiscussionPanel';
import Profile from '../components/common/Profile';
import ClassesLayout from '../components/layouts/ClassesLayout';
import ClassroomLayout from '../components/layouts/ClassroomLayout';
import ClassLayoutWithSidebar from '../components/layouts/ClassLayoutWithSidebar';
import lectureRoute from './lectureRoute';
import PendingAssignments from '../components/classroom/student/assignments/PendingAssignments';
import Works from '../components/classroom/student/assignments/Works';
import CompletedWork from '../components/classroom/student/assignments/CompletedWork';
import AttendQuestion from '../pages/student/AttendQuestion';
import ErrorElement from '../components/common/ErrorElement';
import Shimmer from '../components/common/Shimmer';

const ChatHome = lazy(()=> import('../pages/chat/ChatHome'));

export const allClassRoute = {
  path: '/',
  element: (
    <PrivateRoute>
      <ClassesLayout />
    </PrivateRoute>
  ),
  children: [
    { path: '/', element: <AllClasses />, errorElement: <h1>5</h1>},
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
        { path: 'quizzes-and-exams', element: <Works filter='missed' /> },
        
      ],
    },
    { path: 'works/quizzes-and-exams/:questionId', element: <AttendQuestion /> },
    lectureRoute,
    {
      path: 'chat-mate',
      element: <Suspense fallback={<Shimmer />}><ChatHome /></Suspense>,
    }
  ],
};
