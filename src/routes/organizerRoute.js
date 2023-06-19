import { lazy } from "react";

const OrganizerLayout = lazy(()=> import("../components/layouts/OrganizerLayout")) ;
const ClassManagement = lazy(()=> import("../components/organizer/ClassManagement")) ;
const EditAnnouncement = lazy(()=> import("../components/organizer/EditAnnouncement"));
const InstructorManagement = lazy(()=> import("../components/organizer/InstructorManagement"));
const AnnouncementManagement = lazy(()=> import( "../pages/organizer/AnnouncementManagement"));
const AssignmentManagement = lazy(()=> import( "../pages/organizer/AssignmentManagement"));

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
    {
      path: 'announcements/:announcementId',
      element: <EditAnnouncement />
    },
  ]
};

export default organizerRoute;