import LectureStudentsManagement from "../components/classroom/Lecture/LectureStudentsManagement";
import Settings from "../components/classroom/Lecture/Settings";
import LayoutWithSidebar from "../components/layouts/LayoutWithSidebar";
import AssignmentManagement from "../pages/instructor/AssignmentManagement";
import Attendance from "../pages/instructor/Attendance";
import Dashboard from "../pages/instructor/Dashboard";
import EditAssignment from "../pages/instructor/EditAssignmet";
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
      element: <EditAssignment />
    },
    {
      path: 'assignments/:assignmentId/submissions',
      element: <Submissions />
    },
    {
      path: 'attendance',
      element: <Attendance />,
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
}

export default lectureRoute;