import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Spin,
  Typography,
  Modal,
  Button,
  Form,
  Input,
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const { Meta } = Card;
const { Paragraph } = Typography;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersWithLikes = response.data.map((user) => ({
          ...user,
          liked: false,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&mood[]=happy`,
        }));
        setUsers(usersWithLikes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Edit handler
  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsModalOpen(true);
  };

  // Delete handler
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Like handler
  const handleLike = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, liked: !user.liked } : user
      )
    );
  };

  // Rest of your component remains the same
  // ... (Modal JSX and other code)

  return (
    <div className="app-container">
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col xs={24} sm={12} lg={6} key={user.id}>
            <Card
              actions={[
                <span key="heart" onClick={() => handleLike(user.id)}>
                  {user.liked ? (
                    <HeartFilled style={{ fontSize: 18, color: "#eb2f96" }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: 18, color: "#eb2f96" }} />
                  )}
                </span>,
                <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDeleteUser(user.id)}
                />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    className="h-full bg-gray-200 w-auto"
                  />
                }
                title={user.name}
                description={
                  <>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: {user.website}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update User
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
