import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Avatar,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useCreatePigeonMutation } from '../myflock.queries';

const { Text } = Typography;
const { Option } = Select;

interface PigeonFormData {
  name: string;
  color: string;
  ringNumber: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  breed?: string;
  strain?: string;
  eyeSign?: string;
  fatherId?: string;
  motherId?: string;
  notes?: string;
  images?: UploadFile[];
}

const genderOptions = [
  { value: 'male', label: '♂ Male' },
  { value: 'female', label: '♀ Female' },
];

const colorOptions = [
  { value: 'blue_bar', label: 'Blue Bar' },
  { value: 'blue_check', label: 'Blue Check' },
  { value: 'red_check', label: 'Red Check' },
  { value: 'mealy', label: 'Mealy' },
  { value: 'grizzle', label: 'Grizzle' },
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'dun', label: 'Dun' },
  { value: 'other', label: 'Other' },
];

const breedOptions = [
  { value: 'racing_homer', label: 'Racing Homer' },
  { value: 'show_homer', label: 'Show Homer' },
  { value: 'tumbler', label: 'Tumbler' },
  { value: 'roller', label: 'Roller' },
  { value: 'fantail', label: 'Fantail' },
  { value: 'other', label: 'Other' },
];

const AddPigeonForm: React.FC = () => {
  const [form] = Form.useForm<PigeonFormData>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    mutate: createPigeon,
    isPending: createPigeonIsPending,
    isError: createPigeonIsError,
    error: createPigeonErrorDetails,
  } = useCreatePigeonMutation();

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const onFinish = (values: PigeonFormData) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        gender: 'male',
        color: 'blue_bar',
        breed: 'racing_homer',
      }}
      onFinish={onFinish}
    >
      {/* Information Section */}
      <div style={{ marginBottom: 24, marginTop: 24 }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Pigeon Name"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="E.g. Thunderbolt" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="ringNumber"
              label="Ring Number"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="AU-2023-1234" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select options={genderOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="color" label="Color">
              <Select options={colorOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="breed" label="Breed">
              <Select options={breedOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Lineage Section */}
      <div style={{ marginBottom: 24 }}>
        <Text
          strong
          style={{ display: 'block', marginBottom: 16, fontSize: 16 }}
        >
          Lineage
        </Text>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="fatherId" label="Father">
              <Select
                placeholder="Select father"
                allowClear
                showSearch
                optionFilterProp="children"
                suffixIcon={
                  <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                    ♂
                  </Avatar>
                }
              >
                <Option value="pigeon1">Thunder (AU-2021-4567)</Option>
                <Option value="pigeon2">Lightning (AU-2020-7890)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="motherId" label="Mother">
              <Select
                placeholder="Select mother"
                allowClear
                showSearch
                optionFilterProp="children"
                suffixIcon={
                  <Avatar size="small" style={{ backgroundColor: '#ff4d4f' }}>
                    ♀
                  </Avatar>
                }
              >
                <Option value="pigeon3">Sky (AU-2022-1234)</Option>
                <Option value="pigeon4">Rain (AU-2021-5678)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Images Section */}
      <div style={{ marginBottom: 24 }}>
        <Text
          strong
          style={{ display: 'block', marginBottom: 16, fontSize: 16 }}
        >
          Pigeon Photos
        </Text>
        <Form.Item
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList || []}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            maxCount={3}
            accept="image/*"
          >
            {fileList.length < 3 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Max 3 photos
                </Text>
              </div>
            )}
          </Upload>
        </Form.Item>
      </div>

      {/* Form Actions */}
      <Row justify="end" style={{ marginTop: 24 }}>
        <Form.Item style={{ alignItems: 'center' }}>
          <Space align="end">
            <Button htmlType="reset" size="large">
              Reset
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Save Pigeon
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default AddPigeonForm;
