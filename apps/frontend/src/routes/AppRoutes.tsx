import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '@frontend/app/auth/Login';
import MyFlock from '@frontend/app/pages/MyFlock';
import MainLayout from '@frontend/app/layouts/MainLayout';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
import Races from '@app/pages/Races';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {/* Protected routes with common layout */}
    <Route element={<ProtectedRoutes />}>
      <Route element={<MainLayout />}>
        <Route path={APP_ROUTES.MY_FLOCK} element={<MyFlock />} />
        <Route path={APP_ROUTES.RACES} element={<Races />} />
        <Route
          path="/"
          element={<Navigate to={APP_ROUTES.MY_FLOCK} replace />}
        />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
