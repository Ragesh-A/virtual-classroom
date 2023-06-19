import { Suspense, lazy } from "react";
import Shimmer from "../components/common/Shimmer";
import ErrorBoundary from "../pages/ErrorBoundary";

const  LectureStudentsManagement = lazy(()=> import("../components/classroom/Lecture/LectureStudentsManagement"));
const  Settings = lazy(()=> import("../components/classroom/Lecture/Settings"));
const  LayoutWithSidebar = lazy(()=> import("../components/layouts/LayoutWithSidebar"));
const  AnnouncementManagement = lazy(()=> import("../pages/instructor/AnnouncementManagement"));
const  AssignmentManagement = lazy(()=> import("../pages/instructor/AssignmentManagement"));
const  Attendance = lazy(()=> import("../pages/instructor/Attendance"));
const  Dashboard = lazy(()=> import("../pages/instructor/Dashboard"));
const  EditAssignment = lazy(()=> import("../pages/instructor/EditAssignment"));
const  CreateQuestions = lazy(()=> import("../pages/instructor/CreateQuestions"));
const  Submissions = lazy(()=> import("../pages/instructor/Submissions"));
const  QuizManagement = lazy(()=> import("../pages/instructor/QuizManagement"));

const lectureRoute = {
  path: 'dashboard',
  element:(
    <Suspense fallback={<Shimmer />}>
      <ErrorBoundary>
        <LayoutWithSidebar />
      </ErrorBoundary>
    </Suspense>
  ),
  children: [
    {
      path: '',
      element: <Dashboard />
    },
    { 
      path: 'students',
      element: <LectureStudentsManagement />
    },
    {
      path: 'assignments',
      element: <AssignmentManagement />,
    },
    {
      path: 'assignments/:assignmentId',
      element: <EditAssignment />
    },
    {
      path: 'assignments/:assignmentId/submissions',
      element: <Submissions />
    },
    {
      path: 'announcements',
      element: <AnnouncementManagement />,
    },
    {
      path: 'attendance',
      element: <Attendance />,
    },
    {
      path: 'quizzes-and-exams',
      element: <QuizManagement />,
    },
    {
      path: 'quizzes-and-exams/create',
      element: <CreateQuestions />,
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
}

export default lectureRoute;