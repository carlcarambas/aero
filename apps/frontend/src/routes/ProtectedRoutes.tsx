import { useSession } from '@frontend/lib/hooks/use-session';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  // TODO this should be from the store
  // const user = { name: 'Carl', email: 'carl@carl.com' };
  const location = useLocation();
  const session = useSession();

  // console.log('## SESSION.USER ', session.user);
  // if (session.status === 'unauthenticated' || session.status === 'loading') {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
