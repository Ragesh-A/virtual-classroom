import OrganizerLayout from "../components/layouts/OrganiserLayout";
import ClassManagement from "../components/organizer/ClassManagement";
import InstructorManagement from "../components/organizer/InstructorManagement";
import AssignmentManagement from "../pages/organizer/AssignmentManagement";

const organizerRoute = {
  path: '/organization',
  element: <OrganizerLayout />,
  children: [
    {
      path: '',
      element: <ClassManagement />
    },
    {
      path: 'instructors',
      element: <InstructorManagement />
    },
    {
      path: 'assignments',
      element: <AssignmentManagement />
    },
  ]
};

export default organizerRoute;