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
import Shimmer from '../components/common/Shimmer';
import ErrorBoundary from '../pages/ErrorBoundary';
import ListQuestions from '../pages/student/ListQuestions';
import EditProfile from '../components/common/EditProfile';
import QuizOrExam from '../pages/student/QuizOrExam';

const ChatHome = lazy(() => import('../pages/chat/ChatHome'));

export const allClassRoute = {
  path: '/',
  element: (
    <ErrorBoundary>
      <PrivateRoute>
        <ClassesLayout />
      </PrivateRoute>
    </ErrorBoundary>
  ),
  children: [
    { path: '', element: <AllClasses /> },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'profile/edit',
      element: <EditProfile />,
    },
  ],
};

export const classRoute = {
  path: '/class/:classId',
  element: (
    <ErrorBoundary>
      <PrivateRoute>
        <ClassroomLayout />
      </PrivateRoute>
    </ErrorBoundary>
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
        { path: 'completed', element: <CompletedWork /> },
        { path: 'missed', element: <Works filter="missed" /> },
        { path: 'quizzes-and-exams', element: <ListQuestions /> },
      ],
    },
    {
      path: 'works/quizzes-and-exams/:questionId',
      element: <QuizOrExam />,
    },
    lectureRoute,
    {
      path: 'chat-mate',
      element: (
        <Suspense fallback={<Shimmer />}>
          <ErrorBoundary>
            <ChatHome />
          </ErrorBoundary>
        </Suspense>
      ),
    },
  ],
};
