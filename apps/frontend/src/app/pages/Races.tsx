import { SearchOutlined, TrophyFilled } from '@ant-design/icons';
import RaceList from '@app/components/features/races/RaceList';
import RaceResults from '@app/components/features/races/RaceResults';
import { Button, Card, Input, Menu, Space, Tabs } from 'antd';

const Races = () => {
  const raceTabs = [
    {
      key: '1',
      label: 'Races',
      children: <RaceList />,
    },
    {
      key: '2',
      label: 'Results',
      icon: <TrophyFilled />,
      children: <RaceResults />,
    },
  ];
  return (
    <Card>
      <Tabs items={raceTabs} defaultActiveKey={raceTabs[0].key} type="card" />
    </Card>
  );
};

export default Races;
