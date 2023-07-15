import { Suspense, lazy } from 'react';
import Shimmer from '../components/common/Shimmer';
import ErrorBoundary from '../pages/ErrorBoundary';
import ViewQuestionAnswers from '../pages/instructor/ViewQuesstionAnswers';
import ViewSubmission from '../pages/instructor/ViewSubmission';

const Dashboard = lazy(() => import('../pages/instructor/Dashboard'));
const Attendance = lazy(() => import('../pages/instructor/Attendance'));

const LectureStudentsManagement = lazy(() =>
  import('../components/classroom/Lecture/LectureStudentsManagement')
);
const LayoutWithSidebar = lazy(() =>
import('../components/layouts/LayoutWithSidebar')
);
const AnnouncementManagement = lazy(() =>
  import('../pages/instructor/AnnouncementManagement')
);
const AssignmentManagement = lazy(() =>
  import('../pages/instructor/AssignmentManagement')
);
const EditAssignment = lazy(() => import('../pages/instructor/EditAssignment'));

const CreateQuestions = lazy(() =>
  import('../pages/instructor/CreateQuestions')
);
const Submissions = lazy(() => import('../pages/instructor/Submissions'));
const QuizManagement = lazy(() => import('../pages/instructor/QuizManagement'));
const Settings = lazy(() => import('../components/classroom/Lecture/Settings'));

const lectureRoute = {
  path: 'dashboard',
  element: (
    <Suspense fallback={<Shimmer />}>
      <ErrorBoundary>
        <LayoutWithSidebar />
      </ErrorBoundary>
    </Suspense> 
  ),
  children: [
    {
      path: '',
      element: <Dashboard />,
    },
    {
      path: 'students',
      element: (
        <Suspense fallback={<Shimmer />}>
          <LectureStudentsManagement />
        </Suspense>
      ),
    },
    {
      path: 'assignments',
      element: (
        <Suspense fallback={<Shimmer />}>
          <AssignmentManagement /> 
        </Suspense>
      ),
    },
    {
      path: 'assignments/:assignmentId',
      element: (
        <Suspense fallback={<Shimmer />}>
          <EditAssignment />
        </Suspense>
      ),
    },
    {
      path: 'assignments/:assignmentId/submissions',
      element: (
        <Suspense fallback={<Shimmer />}>
          <Submissions />
        </Suspense>
      ),
    },
    {
      path: 'assignments/:assignmentId/submissions/:submissionId',
      element: (
        <Suspense fallback={<Shimmer />}>
          <ViewSubmission />
        </Suspense>
      ),
    },
    {
      path: 'announcements',
      element: (
        <Suspense fallback={<Shimmer />}>
          <AnnouncementManagement />
        </Suspense>
      ),
    },
    {
      path: 'attendance',
      element: (
        <Suspense fallback={<Shimmer />}>
          <Attendance />
        </Suspense>
      ),
    },
    {
      path: 'quizzes-and-exams',
      element: (
        <Suspense fallback={<Shimmer />}>
          <QuizManagement />
        </Suspense>
      ),
    },
    {
      path: 'quizzes-and-exams/create',
      element: (
        <Suspense fallback={<Shimmer />}>
          <CreateQuestions />
        </Suspense>
      ),
    },
    {
      path: 'quizzes-and-exams/:questionId',
      element: (
        <Suspense fallback={<Shimmer />}>
          <ViewQuestionAnswers />
        </Suspense>
      ),
    },
    {
      path: 'settings',
      element: (
        <Suspense fallback={<Shimmer />}>
          <Settings />
        </Suspense>
      ),
    },
  ],
};

export default lectureRoute;
