import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  // TODO this should be from the store
  const user = { name: 'Carl', email: 'carl@carl.com' };
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
