import LectureStudentsManagement from "../components/classroom/Lecture/LectureStudentsManagement";
import LayoutWithSidebar from "../components/layouts/LayoutWithSidebar";

const lectureRoute = {
  path: 'dashboard',
  element: <LayoutWithSidebar />,
  children: [
    { path: '',
    element: <LectureStudentsManagement />
  }
  ]
}

export default lectureRoute;