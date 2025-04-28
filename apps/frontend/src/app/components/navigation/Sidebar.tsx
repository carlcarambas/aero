import { DingtalkOutlined, TrophyFilled } from '@ant-design/icons';
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
];

const Sidebar = () => {
  const appContext = useAppContext();
  const handleMenuClick = (e: { key: string }) => {
    appContext.navigateToPage(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleMenuClick}
      selectedKeys={[appContext?.selectedNavItem]}
    >
      {MENU_ITEMS.map((item) => (
        <Menu.Item key={item?.key} icon={item?.icon}>
          {item?.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;
