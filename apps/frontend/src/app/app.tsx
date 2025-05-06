import { App as AntApp, ConfigProvider, Modal } from 'antd';
import AppRoutes from '@frontend/routes/AppRoutes';
import { useAppStore } from '@frontend/lib/hooks/app-store';

export function App() {
  const { showModal, modalContent } = useAppStore();
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
        <AppRoutes />
        <Modal open={showModal} {...modalContent}>
          {modalContent?.form}
        </Modal>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
