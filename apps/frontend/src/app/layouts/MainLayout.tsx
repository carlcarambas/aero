import { Flex, Layout, Menu, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '@frontend/app/components/navigation/Sidebar';
import { DingtalkCircleFilled } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsedWidth={60} collapsible>
        <Flex align="center" justify="center" className="h-16 ">
          <DingtalkCircleFilled style={{ color: '#fff', fontSize: '3em' }} />
        </Flex>
        <Sidebar />
      </Sider>

      <Layout>
        {/* // TODO add a header component */}
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px' }}>
          <Outlet /> {/* This renders the matched child route */}
        </Content>
      </Layout>
    </Layout>
  );
}
