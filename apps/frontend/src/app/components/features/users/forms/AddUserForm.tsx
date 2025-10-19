import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import { useAppStore } from '@frontend/lib/hooks/app-store';
import { useCreateUserMutation } from '@frontend/services/users/users.service';

const { Text } = Typography;
const { Option } = Select;

interface UserFormData {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  city: string;
  latitude: number;
  longitude: number;
  contactNumber?: string;
  address?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

const roleOptions = [
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'USER', label: 'User' },
];

const AddUserForm: React.FC = () => {
  const [form] = Form.useForm<UserFormData>();
  const { setShowModal } = useAppStore();
  const { mutate: createUser, isPending: isSubmitting } = useCreateUserMutation();

  const onFinish = (values: UserFormData) => {
    createUser(values, {
      onSuccess: () => {
        message.success('User created successfully');
        setShowModal(false);
        form.resetFields();
      },
      onError: (error) => {
        message.error('Failed to create user: ' + error.message);
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        role: 'USER',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* Basic Information Section */}
      <div style={{ marginBottom: 24, marginTop: 24 }}>
        <Text
          strong
          style={{ display: 'block', marginBottom: 16, fontSize: 16 }}
        >
          Basic Information
        </Text>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter the user\'s full name' },
                { min: 2, message: 'Name must be at least 2 characters' },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter an email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input placeholder="user@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select options={roleOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="contactNumber"
              label="Contact Number"
              rules={[
                { pattern: /^[+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input placeholder="+1234567890" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Location Information Section */}
      <div style={{ marginBottom: 24 }}>
        <Text
          strong
          style={{ display: 'block', marginBottom: 16, fontSize: 16 }}
        >
          Location Information
        </Text>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { min: 5, message: 'Address must be at least 5 characters' },
              ]}
            >
              <Input placeholder="123 Main Street" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                { required: true, message: 'Please enter the city' },
                { min: 2, message: 'City must be at least 2 characters' },
              ]}
            >
              <Input placeholder="Enter city name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="state"
              label="State/Province"
            >
              <Input placeholder="NY" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="postalCode"
              label="Postal Code"
            >
              <Input placeholder="10001" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="country"
              label="Country"
            >
              <Input placeholder="USA" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="latitude"
              label="Latitude"
              rules={[
                { required: true, message: 'Please enter latitude' },
                { 
                  type: 'number', 
                  min: -90, 
                  max: 90, 
                  message: 'Latitude must be between -90 and 90' 
                },
              ]}
              getValueFromEvent={(e) => parseFloat(e.target.value) || undefined}
            >
              <Input 
                type="number" 
                step="any" 
                placeholder="40.7128" 
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="longitude"
              label="Longitude"
              rules={[
                { required: true, message: 'Please enter longitude' },
                { 
                  type: 'number', 
                  min: -180, 
                  max: 180, 
                  message: 'Longitude must be between -180 and 180' 
                },
              ]}
              getValueFromEvent={(e) => parseFloat(e.target.value) || undefined}
            >
              <Input 
                type="number" 
                step="any" 
                placeholder="-74.0060" 
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Form Actions */}
      <Row justify="end" style={{ marginTop: 24 }}>
        <Form.Item style={{ alignItems: 'center' }}>
          <Space align="end">
            <Button
              htmlType="reset"
              size="large"
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
            >
              Create User
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default AddUserForm;
