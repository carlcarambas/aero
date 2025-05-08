import React, { useEffect, useState } from 'react';
import {
  List,
  Tag,
  Button,
  Input,
  Space,
  Typography,
  Avatar,
  Card,
  Popconfirm,
  Spin,
  message,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { usePigeonsQuery } from '@frontend/services/pigeons/pigeons.service';
import { useAppStore } from '@frontend/lib/hooks/app-store';
import AddPigeonForm from '@app/components/features/myflocks/forms/AddPigeonForm';
import { useDeletePigeonMutation } from '@app/components/features/myflocks/myflock.queries';
import { queryClient } from '@frontend/query-client';

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
  const {
    mutate: deletePigeon,
    isPending: deletePigeonIsPending,
    isSuccess: deletePigeonIsSuccess,
    isError: deletePigeonIsError,
  } = useDeletePigeonMutation();

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

  const handleDelete = (id: string) => {
    console.log('Deleting pigeon with id: ', id);
    try {
      deletePigeon(id);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    if (deletePigeonIsSuccess) {
      message.success('Pigeon Deleted');
      queryClient.invalidateQueries({ queryKey: ['pigeons'] });
    }
    if (deletePigeonIsError) {
      message.error('Failed to delete pigeon');
    }
  }, [deletePigeonIsSuccess]);

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
    return <Spin />;
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
          pageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} pigeons`,
        }}
        renderItem={(pigeon) => (
          <List.Item
            actions={[
              <Button type="text" icon={<EditOutlined />} />,
              <Popconfirm
                title="Are you sure you want to delete this record?"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => handleDelete(pigeon.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  loading={deletePigeonIsPending}
                />
              </Popconfirm>,
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
