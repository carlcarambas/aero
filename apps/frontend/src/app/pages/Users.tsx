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
  Spin,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar: string | null;
  pigeonsCount: number;
  latitude: number;
  longitude: number;
  city: string;
}

// Mock data for UI development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: null,
    pigeonsCount: 12,
    latitude: 40.7128,
    longitude: -74.0060,
    city: 'New York',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14',
    avatar: null,
    pigeonsCount: 8,
    latitude: 34.0522,
    longitude: -118.2437,
    city: 'Los Angeles',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10',
    avatar: null,
    pigeonsCount: 5,
    latitude: 41.8781,
    longitude: -87.6298,
    city: 'Chicago',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: null,
    pigeonsCount: 15,
    latitude: 29.7604,
    longitude: -95.3698,
    city: 'Houston',
  },
];

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading] = useState(false);

  // Filter users based on search
  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const roleColors = {
    admin: 'red',
    moderator: 'blue',
    user: 'green',
  };

  const statusColors = {
    active: 'green',
    inactive: 'orange',
  };

  const handleCreateUser = () => {
    console.log('Create user clicked');
    // TODO: Implement create user functionality
  };

  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
    // TODO: Implement edit user functionality
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId);
    // TODO: Implement delete user functionality
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (record: User) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />} 
            size="large" 
          />
          <div>
            <div><Text strong>{record.name}</Text></div>
            <div><Text type="secondary">{record.email}</Text></div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={roleColors[role as keyof typeof roleColors]}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status as keyof typeof statusColors]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Pigeons',
      dataIndex: 'pigeonsCount',
      key: 'pigeonsCount',
      render: (count: number) => (
        <Text strong style={{ fontSize: '16px' }}>
          {count}
        </Text>
      ),
      sorter: (a: User, b: User) => a.pigeonsCount - b.pigeonsCount,
    },
    {
      title: 'Location',
      key: 'location',
      render: (record: User) => (
        <div>
          <div><Text strong>{record.city}</Text></div>
          <div><Text type="secondary" style={{ fontSize: '12px' }}>
            {record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}
          </Text></div>
        </div>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => (
        <Text type="secondary">{date}</Text>
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
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Spin />;
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateUser}>
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
