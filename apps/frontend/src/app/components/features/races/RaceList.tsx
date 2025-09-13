import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const RaceList = () => {
  const columns: ColumnsType = [
    {
      title: 'Race Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Race Distance',
      dataIndex: 'distance',
      key: 'distance',
      render: (distance: string) => `${distance} km`,
    },
    {
      title: 'Race Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Race Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) =>
        time !== '--' ? time : <Tag color="orange">Pending</Tag>,
    },
    // {
    //   title: 'Race Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: string) => {
    //     let color = '';
    //     switch (status) {
    //       case 'finished':
    //         color = 'green';
    //         break;
    //       case 'disqualified':
    //         color = 'red';
    //         break;
    //       case 'in-progress':
    //         color = 'blue';
    //         break;
    //       default:
    //         color = 'gray';
    //     }
    //     return <Tag color={color}>{status.toUpperCase()}</Tag>;
    //   },
    //   filters: [
    //     { text: 'Finished', value: 'finished' },
    //     { text: 'Disqualified', value: 'disqualified' },
    //     { text: 'In Progress', value: 'in-progress' },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    //   sorter: (a, b) => a.status - b.status,
    //   defaultSortOrder: 'ascend',
    //   sortDirections: ['descend', 'ascend'],
    //   sortDirectionsType: 'default',
    //   filterMultiple: false,
    // },
  ];

  const mockData = [
    {
      id: 1,
      name: 'Race 1',
      date: '2023-05-01',
      time: '12:00',
      status: 'upcoming',
      distance: '350',
    },
    {
      id: 2,
      name: 'Race 2',
      date: '2023-05-02',
      time: '12:00',
      status: 'upcoming',
      distance: '350',
    },
    {
      id: 3,
      name: 'Race 3',
      date: '2023-05-03',
      time: '12:00',
      status: 'upcoming',
      distance: '500',
    },
  ];

  // const filteredRaces = mockData.filter((race) => {
  //   const matchesSearch = race?.status.toLowerCase().includes()
  // })

  const statusColors = {
    upcoming: 'orange',
    finished: 'green',
    cancelled: 'grey',
  };

  return (
    <Card
      extra={
        <Space>
          <Input
            placeholder="Search pigeons..."
            prefix={<SearchOutlined />}
            // onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Space.Compact>
            <Button
              type="default"
              // type={filterStatus === null ? 'primary' : 'default'}
              // onClick={() => setFilterStatus(null)}
            >
              All
            </Button>
            {Object.keys(statusColors).map((status) => (
              <Button
                key={status}
                // type={filterStatus === status ? 'primary' : 'default'}
                // onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </Space.Compact>
        </Space>
      }
    ></Card>
    // <Table
    //   title={() => <h3>Upcoming Races</h3>}
    //   columns={columns}
    //   dataSource={mockData}
    // ></Table>
  );
};

export default RaceList;
