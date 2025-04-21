import React, { useState } from 'react';
import {
  List,
  Tag,
  Button,
  Input,
  Space,
  Typography,
  Avatar,
  Card,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { usePigeonsQuery } from '@frontend/services/pigeons/pigeons.service';

const { Text } = Typography;

interface Pigeon {
  id: string;
  name: string;
  breed: string;
  color: string;
  age: number;
  status: 'active' | 'retired' | 'training';
  lastRace?: string;
  imageUrl?: string;
}

const MyFlock: React.FC = () => {
  const pigeonsQuery = usePigeonsQuery();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const { data: pigeonsResult, isLoading } = pigeonsQuery;
  // Sample data
  const [pigeons, setPigeons] = useState<Pigeon[]>([
    {
      id: '1',
      name: 'Thunder',
      breed: 'Racing Homer',
      color: 'Blue Bar',
      age: 2,
      status: 'active',
      lastRace: '2023-10-15',
      imageUrl: 'https://randomuser.me/api/portraits/thumb/animals/1.jpg',
    },
    {
      id: '2',
      name: 'Lightning',
      breed: 'Tippler',
      color: 'Red Check',
      age: 3,
      status: 'retired',
      imageUrl: 'https://randomuser.me/api/portraits/thumb/animals/2.jpg',
    },
    {
      id: '3',
      name: 'Sky',
      breed: 'Fantail',
      color: 'White',
      age: 1,
      status: 'training',
      imageUrl: 'https://randomuser.me/api/portraits/thumb/animals/3.jpg',
    },
    {
      id: '4',
      name: 'Storm',
      breed: 'Fantail',
      color: 'Black',
      age: 4,
      status: 'active',
      lastRace: '2023-11-02',
      imageUrl: 'https://randomuser.me/api/portraits/thumb/animals/4.jpg',
    },
  ]);

  // Filter pigeons based on search and status
  const filteredPigeons = pigeons.filter((pigeon) => {
    const matchesSearch =
      pigeon.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pigeon.breed.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? pigeon.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    active: 'green',
    retired: 'orange',
    training: 'blue',
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      title="My Flock"
      extra={
        <Space>
          <Input
            placeholder="Search pigeons..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button.Group>
            <Button
              type={filterStatus === null ? 'primary' : 'default'}
              onClick={() => setFilterStatus(null)}
            >
              All
            </Button>
            {Object.keys(statusColors).map((status) => (
              <Button
                key={status}
                type={filterStatus === status ? 'primary' : 'default'}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </Button.Group>
          <Button type="primary">Add New Pigeon</Button>
        </Space>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={filteredPigeons}
        pagination={{
          pageSize: 4,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} pigeons`,
        }}
        renderItem={(pigeon) => (
          <List.Item
            actions={[
              <Button type="text" icon={<EditOutlined />} />,
              <Button type="text" danger icon={<DeleteOutlined />} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={pigeon.imageUrl} size="large" />}
              title={<Text strong>{pigeon.name}</Text>}
              description={
                <Space direction="vertical" size={0}>
                  <div>
                    <Tag color={statusColors[pigeon.status]}>
                      {pigeon.status.toUpperCase()}
                    </Tag>
                    <Text type="secondary">{pigeon.breed}</Text>
                  </div>
                  <div>
                    <Text>Color: {pigeon.color}</Text>
                    <Text style={{ marginLeft: 16 }}>
                      Age: {pigeon.age} years
                    </Text>
                  </div>
                  {pigeon.lastRace && (
                    <Text type="secondary">Last race: {pigeon.lastRace}</Text>
                  )}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MyFlock;
