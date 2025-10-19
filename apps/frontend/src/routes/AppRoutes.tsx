import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '@app/components/auth/Login';
import MyFlock from '@frontend/app/pages/MyFlock';
import MainLayout from '@frontend/app/layouts/MainLayout';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
import Races from '@app/pages/Races';
import Users from '@frontend/app/pages/Users';
// import FirebaseLogin from '@app/components/auth/FirebaseLogin';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {/* <Route path="/login" element={<FirebaseLogin />} /> */}
    {/* Protected routes with common layout */}
    <Route element={<ProtectedRoutes />}>
      <Route element={<MainLayout />}>
        <Route path={APP_ROUTES.MY_FLOCK} element={<MyFlock />} />
        <Route path={APP_ROUTES.RACES} element={<Races />} />
        <Route path={APP_ROUTES.USERS} element={<Users />} />
        <Route
          path="/"
          element={<Navigate to={APP_ROUTES.MY_FLOCK} replace />}
        />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
