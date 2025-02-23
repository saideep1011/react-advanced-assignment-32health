import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spin, Form } from "antd";
import EditUserModal from "./components/Modal/Modal";
import UserCard from "./components/Card/Card";

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

  const handleUpdateUser = (updatedValues) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedValues } : user
      )
    );
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleLike = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, liked: !user.liked } : user
      )
    );
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Row gutter={[12, 12]}>
          {users.map((user) => (
            <Col xs={24} sm={12} lg={6} key={user.id} style={{ padding: 16 }}>
              <UserCard
                user={user}
                onEdit={handleEdit}
                onDelete={handleDeleteUser}
                onLike={handleLike}
              />
            </Col>
          ))}
        </Row>
      )}

      <EditUserModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdateUser}
        form={form}
      />
    </div>
  );
}

export default App;
