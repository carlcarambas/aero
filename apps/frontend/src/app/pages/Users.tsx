import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Typography,
  Avatar,
  Card,
  Tag,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@frontend/lib/hooks/app-store';
import AddUserForm from '@app/components/features/users/forms/AddUserForm';
import {
  useUsersQuery,
  useDeleteUserMutation,
  User,
} from '@frontend/services/users/users.service';

const { Text } = Typography;

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { setShowModal } = useAppStore();

  // API queries
  const { data: users, isLoading, isError, error } = useUsersQuery();
  const { mutate: deleteUser, isPending: deleteUserIsPending } =
    useDeleteUserMutation();

  // Filter users based on search
  const filteredUsers =
    users?.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        false ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const roleColors = {
    ADMIN: 'red',
    USER: 'green',
  };

  const handleCreateUser = () => {
    setShowModal(true, {
      title: 'Create New User',
      form: <AddUserForm />,
      okText: 'Create',
      cancelText: 'Cancel',
      width: '60%',
      onCancel() {
        setShowModal(false);
      },
      footer: null,
    });
  };

  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
    // TODO: Implement edit user functionality
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        message.success('User deleted successfully');
      },
      onError: () => {
        message.error('Failed to delete user');
      },
    });
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (record: User) => (
        <Space>
          <Avatar src={record.img} icon={<UserOutlined />} size="large" />
          <div>
            <div>
              <Text strong>{record.name || 'No Name'}</Text>
            </div>
            <div>
              <Text type="secondary">{record.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={roleColors[role as keyof typeof roleColors]}>{role}</Tag>
      ),
    },
    {
      title: 'Pigeons',
      dataIndex: 'pigeons',
      key: 'pigeons',
      render: (pigeons: unknown[]) => (
        <Text strong style={{ fontSize: '16px' }}>
          {pigeons?.length || 0}
        </Text>
      ),
      sorter: (a: User, b: User) =>
        (a.pigeons?.length || 0) - (b.pigeons?.length || 0),
    },
    {
      title: 'Location',
      key: 'location',
      render: (record: User) => (
        <div>
          <div>
            <Text strong>{record.city || 'No City'}</Text>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.lat.toFixed(4)}, {record.lng.toFixed(4)}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.id)}
          />
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            loading={deleteUserIsPending}
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (isError) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Text type="danger">Error loading users: {error?.message}</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Users"
      extra={
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        loading={isLoading}
      />
    </Card>
  );
};

export default Users;
