import {
  DingtalkOutlined,
  TrophyFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useAppContext } from '@context/app.context';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
const MENU_ITEMS = [
  {
    key: APP_ROUTES.MY_FLOCK,
    label: 'My Flock',
    icon: <DingtalkOutlined />,
  },
  { key: APP_ROUTES.RACES, label: 'Races', icon: <TrophyFilled /> },
  { key: APP_ROUTES.USERS, label: 'Users', icon: <UserOutlined /> },
];

const Sidebar = () => {
  const appContext = useAppContext();
  const handleMenuClick = (e: { key: string }) => {
    appContext.navigateToPage(e.key);
  };

  const menuItems = MENU_ITEMS.map((item) => ({
    key: item?.key,
    icon: item?.icon,
    label: item?.label,
  }));

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleMenuClick}
      selectedKeys={[appContext?.selectedNavItem]}
      items={menuItems}
    />
  );
};

export default Sidebar;
