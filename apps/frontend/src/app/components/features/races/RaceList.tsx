import { Table, Tag } from 'antd';
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

  return (
    <Table title={() => <h3>Upcoming Races</h3>} columns={columns}></Table>
  );
};

export default RaceList;
