import UserManagement from '../components/Admin/UserManagement';
import AdminLayout from '../components/layouts/AdminLayout';
import ClassManagement from '../pages/admin/ClassManagement';
import Dashboard from '../pages/admin/Dashboard';

const adminRoute = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'users', element: <UserManagement /> },
    { path: 'classes', element: <ClassManagement /> },
  ],
};

export default adminRoute;
