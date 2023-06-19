import { Suspense, lazy } from "react";
import ErrorBoundary from "../pages/ErrorBoundary";
import Shimmer from "../components/common/Shimmer";

const OrganizerLayout = lazy(()=> import("../components/layouts/OrganizerLayout")) ;
const ClassManagement = lazy(()=> import("../components/organizer/ClassManagement")) ;
const EditAnnouncement = lazy(()=> import("../components/organizer/EditAnnouncement"));
const InstructorManagement = lazy(()=> import("../components/organizer/InstructorManagement"));
const AnnouncementManagement = lazy(()=> import( "../pages/organizer/AnnouncementManagement"));
const AssignmentManagement = lazy(()=> import( "../pages/organizer/AssignmentManagement"));

const organizerRoute = {
  path: '/organization',
  element: (
    <Suspense fallback={<Shimmer />}>
      <ErrorBoundary>
        <OrganizerLayout />
      </ErrorBoundary>
    </Suspense>
  ),
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