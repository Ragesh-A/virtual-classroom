import { Suspense, lazy } from "react";
import ErrorBoundary from "../pages/ErrorBoundary";
import Shimmer from "../components/common/Shimmer";
import QuestionManagement from "../pages/organizer/QuestionManagement";
import QuestionsForm from "../components/questions/QuestionsFrom";

const OrganizerLayout = lazy(()=> import("../components/layouts/OrganizerLayout"));
const Dashboard = lazy(()=> import("../pages/organizer/Dashboard"));
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
      path: '',
      element: <Dashboard />
    },
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
    {
      path: 'questions',
      element: <QuestionManagement />
    },
    {
      path: 'questions/create',
      element: <QuestionsForm />
    },
  ]
};

export default organizerRoute;