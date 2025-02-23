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
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
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

  return (
    <div className="app-container">
      <Row gutter={[12, 12]}>
        {users.map((user) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={user.id}
            style={{ padding: 16, paddingLeft: 16, paddingRight: 16 }}
          >
            <Card
              style={{ backgroundColor: "#F5F5F5", padding: 0 }}
              styles={{ body: { padding: "0px" } }}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
                <span key="heart" onClick={() => handleLike(user.id)}>
                  {user.liked ? (
                    <HeartFilled style={{ color: "#eb2f96" }} />
                  ) : (
                    <HeartOutlined style={{ color: "inherit" }} />
                  )}
                </span>,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDeleteUser(user.id)}
                />,
              ]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size={194}
                    style={{ flexShrink: 0 }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <h3
                    style={{ marginBottom: 8, fontWeight: 600, marginLeft: 16 }}
                  >
                    {user.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      marginLeft: 16,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#4B5563",
                      }}
                    >
                      <MailOutlined style={{ fontSize: "18px" }} />
                      <span style={{ fontSize: 14, marginLeft: 4 }}>
                        {user.email}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#4B5563",
                      }}
                    >
                      <PhoneOutlined style={{ fontSize: 18 }} />
                      <span style={{ fontSize: 14, marginLeft: 4 }}>
                        {user.phone}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#4B5563",
                      }}
                    >
                      <GlobalOutlined style={{ fontSize: 18 }} />
                      <a
                        href={`http://${user.website}`}
                        style={{
                          fontSize: 14,
                          textDecoration: "none",
                          marginLeft: 4,
                          color: "#4B5563",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        http://{user.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel">Cancel</Button>,
          <Button key="ok" type="primary">
            OK
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            label="Website"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
