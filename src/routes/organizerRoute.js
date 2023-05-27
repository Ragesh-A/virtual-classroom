import OrganizerLayout from "../components/layouts/OrganiserLayout";
import ClassManagement from "../components/organizer/ClassManagement";
import InstructorManagement from "../components/organizer/InstructorManagement";

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
    }
  ]
};

export default organizerRoute;