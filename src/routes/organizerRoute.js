import OrganizerLayout from "../components/layouts/OrganizerLayout";
import ClassManagement from "../components/organizer/ClassManagement";
import InstructorManagement from "../components/organizer/InstructorManagement";
import AnnouncementManagement from "../pages/organizer/AnnouncementManagement";
import AssignmentManagement from "../pages/organizer/AssignmentManagement";

const organizerRoute = {
  path: '/organization',
  element: <OrganizerLayout />,
  children: [
    {
      path: 'classes',
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
    {
      path: 'announcements',
      element: <AnnouncementManagement />
    },
  ]
};

export default organizerRoute;