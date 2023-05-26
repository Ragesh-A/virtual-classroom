import UserManagement from '../components/Admin/UserManagement';
import AdminLayout from '../components/layouts/AdminLayout';

const adminRoute = {
  path: '/admin',
  element: <AdminLayout />,
  children: [{ path: '', element: <UserManagement /> }],
};

export default adminRoute;
