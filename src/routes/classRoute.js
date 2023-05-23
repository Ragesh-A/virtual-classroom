import PrivateRoute from '../components/PrivateRoute';
import AllClasses from '../components/classroom/AllClasses';
import DiscussionPanel from '../components/classroom/common/DiscussionPanel';
import ClassroomLayout from '../components/layouts/ClassroomLayout';

const singleClassRoute = {
  path: ':classId',
  element: <>SingleClass</>
}

const classRoute = {
  path: '/',
  element: (
    <PrivateRoute>
      <ClassroomLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: '/',
      element: <AllClasses />,
    },
    {
      path: 'class/',
      element: <DiscussionPanel />,
      children: [singleClassRoute]
    },
  ],
};

export default classRoute;
