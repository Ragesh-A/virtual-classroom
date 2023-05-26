import Organiserlayout from "../components/layouts/OrganiserLayout";
import ClassManagement from "../components/organizer/ClassManagement";

const organizerRoute = {
  path: '/organization',
  element: <Organiserlayout />,
  children: [
    {
      path: '',
      element: <ClassManagement />
    },
  ]
};

export default organizerRoute;