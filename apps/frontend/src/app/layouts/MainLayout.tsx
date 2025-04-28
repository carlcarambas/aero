import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '@frontend/app/components/navigation/Sidebar';

const { Header, Content, Sider } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsedWidth={60} collapsible>
        <div className="logo" />
        <Sidebar />
      </Sider>

      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px' }}>
          <Outlet /> {/* This renders the matched child route */}
        </Content>
      </Layout>
    </Layout>
  );
}
