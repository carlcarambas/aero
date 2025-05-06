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
  Modal,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { usePigeonsQuery } from '@frontend/services/pigeons/pigeons.service';
import { useAppStore } from '@frontend/lib/hooks/app-store';
import AddPigeonForm from '@app/components/features/myflocks/forms/AddPigeonForm';
import { useCreatePigeonMutation } from '@app/components/features/myflocks/myflock.queries';
// import AddPigeonForm from '@app/components/features/myflocks/forms/AddPigeonForm';

const { Text } = Typography;
export interface Pigeon {
  id: string;
  name: string;
  breed: string;
  color: string;
  age: number;
  status: 'active' | 'retired' | 'training' | 'in_race';
  lastRace?: string;
  imageUrl?: string;
}

const MyFlock: React.FC = () => {
  const pigeonsQuery = usePigeonsQuery();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const { data: pigeons, isLoading, isError, error } = pigeonsQuery;

  const { setShowModal } = useAppStore();

  const showAddPigeonModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering onRowSelectionChange
    setShowModal(true, {
      title: 'Add Pigeon',
      form: <AddPigeonForm />,
      okText: 'Submit',
      cancelText: 'Cancel',
      width: '50%',
      onCancel() {
        setShowModal(false);
      },
      footer: null,
    });
  };

  // Filter pigeons based on search and status
  const filteredPigeons = pigeons
    ? pigeons.filter((pigeon) => {
        const matchesSearch =
          pigeon.name.toLowerCase().includes(searchText.toLowerCase()) ||
          pigeon.breed.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = filterStatus
          ? pigeon.status === filterStatus
          : true;
        return matchesSearch && matchesStatus;
      })
    : [];

  const statusColors = {
    active: 'green',
    retired: 'orange',
    training: 'blue',
    in_race: 'red',
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
          <Space.Compact>
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
          </Space.Compact>
          <Button type="primary" onClick={(event) => showAddPigeonModal(event)}>
            Add New Pigeon
          </Button>
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
