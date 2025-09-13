import { useSession } from '@frontend/lib/hooks/use-session';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  // TODO this should be from the store
  // const user = { name: 'Carl', email: 'carl@carl.com' };
  const location = useLocation();
  // const session = useSession();

  console.log('## location ', location);
  // console.log('## SESSION.USER ', session.user);
  // if (session.status === 'unauthenticated' || session.status === 'loading') {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // TODO remove this once the login is done
  if (location.pathname === APP_ROUTES.DASHBOARD) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
