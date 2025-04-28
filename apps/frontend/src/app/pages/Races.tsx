import RaceResults from '@app/components/RaceResults';
import { Tabs } from 'antd';

const Races = () => {
  const raceTabs = [
    {
      key: '1',
      label: 'Races',
      children: <div>Race List</div>,
    },
    {
      key: '2',
      label: 'Results',
      children: <RaceResults />,
    },
  ];
  return <Tabs items={raceTabs} defaultActiveKey="1" />;
};

export default Races;
