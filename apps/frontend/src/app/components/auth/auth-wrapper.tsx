import { useSession } from '@frontend/lib/hooks/use-session';

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const session = useSession();

  if (session.status === 'unauthenticated' || session.status === 'loading') {
    return <div>unauthenticated</div>;
  }

  return children;
};
