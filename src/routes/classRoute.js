import AllClasses from "../components/classroom/AllClasses";
import ClassroomLayout from "../components/layouts/ClassroomLayout";

const classRoute = {
  path: '/',
  element: <ClassroomLayout />,
  children: [{
    path: '/',
    element: <AllClasses />
  }]
}

export default classRoute;