import LectureStudentsManagement from "../components/classroom/Lecture/LectureStudentsManagement";
import Settings from "../components/classroom/Lecture/Settings";
import LayoutWithSidebar from "../components/layouts/LayoutWithSidebar";
import AssignmentManagement from "../pages/instructor/AssignmentManagement";
import Dashboard from "../pages/instructor/Dashboard";
import Submissions from "../pages/instructor/Submissions";

const lectureRoute = {
  path: 'dashboard',
  element: <LayoutWithSidebar />,
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
      element: <Submissions />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
}

export default lectureRoute;