import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../resources/routes.constants';

export type User = {
  id: string;
  name: string;
  email: string;
} | null;

export interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  selectedNavItem: string;
  setSelectedNavItem: React.Dispatch<React.SetStateAction<string>>;
  navigateToPage: (path: string) => void;
  isAdminPage: boolean;
}

const defaultState = {
  user: null,
  setUser: () => null,
  selectedNavItem: '',
  setSelectedNavItem: () => null,
  navigateToPage: () => null,
  isAdminPage: false,
} as AppContextType;

const AppContext = createContext<AppContextType>(defaultState);

type AppProviderProps = {
  children: ReactNode;
};

export default function AppContextProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [selectedNavItem, setSelectedNavItem] = useState<string>(
    APP_ROUTES.MY_FLOCK
  );
  const location = useLocation();
  const navigate = useNavigate();
  const navigateToPage = (path: string) => {
    setSelectedNavItem(path);
    navigate(path);
  };

  const isAdminPage = useMemo(
    () => location.pathname.includes('/admin'),
    [location.pathname]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        selectedNavItem,
        setSelectedNavItem,
        navigateToPage,
        isAdminPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a DataProvider');
  }
  return context;
};
