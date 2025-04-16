import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../app/auth/Login';
import Dashboard from '../app/pages/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import MainLayout from '../app/layouts/MainLayout';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {/* Protected routes with common layout */}
    <Route element={<ProtectedRoutes />}>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
