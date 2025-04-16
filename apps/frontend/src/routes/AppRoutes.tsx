import { Routes, Route } from 'react-router-dom';
import Login from '../app/auth/Login';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
