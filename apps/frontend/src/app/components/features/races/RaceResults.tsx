import React, { useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Card,
  Statistic,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Alert,
  Typography,
  Button,
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import {
  SearchOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

interface Pigeon {
  key: string;
  ringNumber: string;
  owner: string;
  arrivalTime: string;
  speed: number;
  distance: number;
  position: number;
  status: 'finished' | 'disqualified' | 'in-progress';
}

type DataIndex = keyof Pigeon;

const RaceResults: React.FC = () => {
  // Mock data
  const mockData: Pigeon[] = [
    {
      key: '1',
      ringNumber: 'BELG2023-123456',
      owner: 'John Wick',
      arrivalTime: '2023-06-15 14:32:45',
      speed: 1250,
      distance: 350,
      position: 1,
      status: 'finished',
    },
    {
      key: '2',
      ringNumber: 'NED2023-654321',
      owner: 'Baba Yaga',
      arrivalTime: '2023-06-15 14:35:22',
      speed: 1220,
      distance: 350,
      position: 2,
      status: 'finished',
    },
    {
      key: '3',
      ringNumber: 'GER2023-987654',
      owner: 'Lebrown James',
      arrivalTime: '2023-06-15 14:41:18',
      speed: 1180,
      distance: 350,
      position: 3,
      status: 'finished',
    },
    {
      key: '4',
      ringNumber: 'FRA2023-456789',
      owner: 'Stephen Curry',
      arrivalTime: '--',
      speed: 0,
      distance: 350,
      position: 0,
      status: 'in-progress',
    },
    {
      key: '5',
      ringNumber: 'GBR2023-321654',
      owner: 'Faker',
      arrivalTime: '--',
      speed: 0,
      distance: 350,
      position: 0,
      status: 'disqualified',
    },
  ];

  const [filteredData, setFilteredData] = useState<Pigeon[]>(mockData);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(true);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Pigeon> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filteredValue: searchedColumn === dataIndex ? [searchText] : null,
  });

  const handleDistanceChange = (value: string) => {
    setSelectedDistance(value);
    if (value) {
      const distance = parseInt(value);
      setFilteredData(
        mockData.filter((pigeon) => pigeon.distance === distance)
      );
    } else {
      setFilteredData(mockData);
    }
  };

  const columns: ColumnsType<Pigeon> = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: number) => (position > 0 ? `#${position}` : '-'),
      sorter: (a, b) => a.position - b.position,
    },
    {
      title: 'Ring Number',
      dataIndex: 'ringNumber',
      key: 'ringNumber',
      ...getColumnSearchProps('ringNumber'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      ...getColumnSearchProps('owner'),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      render: (time: string) =>
        time !== '--' ? time : <Tag color="orange">Pending</Tag>,
    },
    {
      title: 'Speed (m/min)',
      dataIndex: 'speed',
      key: 'speed',
      render: (speed: number) => (speed > 0 ? speed.toLocaleString() : '-'),
      sorter: (a, b) => a.speed - b.speed,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'finished':
            color = 'green';
            break;
          case 'disqualified':
            color = 'red';
            break;
          case 'in-progress':
            color = 'blue';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Finished', value: 'finished' },
        { text: 'Disqualified', value: 'disqualified' },
        { text: 'In Progress', value: 'in-progress' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  // Calculate statistics
  const finishedPigeons = mockData.filter((p) => p.status === 'finished');
  const averageSpeed =
    finishedPigeons.length > 0
      ? Math.round(
          finishedPigeons.reduce((acc, p) => acc + p.speed, 0) /
            finishedPigeons.length
        )
      : 0;

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        🏆 Race Results
      </Title>

      {/* Notification */}
      {showNotification && (
        <Alert
          message="Race Information"
          description="This race took place on June 15, 2023. All pigeons departed from Pampanga at 06:00 AM local time."
          type="info"
          showIcon
          closable
          onClose={() => setShowNotification(false)}
          style={{ marginBottom: '24px' }}
        />
      )}

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={8}>
            <Select
              placeholder="Select race distance"
              style={{ width: '100%' }}
              allowClear
              onChange={handleDistanceChange}
              value={selectedDistance}
            >
              <Option value="300">300 km</Option>
              <Option value="350">350 km</Option>
              <Option value="400">400 km</Option>
              <Option value="500">500 km</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Input
              placeholder="Search owner name"
              prefix={<SearchOutlined />}
              onChange={(e) => {
                const searchValue = e.target.value.toLowerCase();
                if (searchValue) {
                  setFilteredData(
                    mockData.filter(
                      (p) =>
                        p.owner.toLowerCase().includes(searchValue) ||
                        p.ringNumber.toLowerCase().includes(searchValue)
                    )
                  );
                } else {
                  setFilteredData(mockData);
                }
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Participants"
              value={mockData.length}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Finished" value={finishedPigeons.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Speed"
              value={averageSpeed}
              suffix="m/min"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Results Table */}
      <Card>
        <Table<Pigeon>
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          bordered
          title={() => <h3>Race Results - Pampanga 350km (15/06/2023)</h3>}
        />
      </Card>
    </div>
  );
};

export default RaceResults;
