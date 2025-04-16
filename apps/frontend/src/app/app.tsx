import { App as AntApp, ConfigProvider } from 'antd';
import AppRoutes from '../routes/AppRoutes';

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'InterVariable, system-ui, sans-serif',
        },
        components: {
          Layout: {
            bodyBg: 'white',
            headerBg: 'rgba(255,255,255,1)',
            headerHeight: 48,
            footerBg: 'white',
          },
        },
      }}
    >
      <AntApp>
        <AppRoutes />;
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
