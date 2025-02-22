import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...values } : user
        )
      );
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-100 border">
            <div className="flex justify-center items-center h-48">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&mood[]=happy`}
                alt={user.name}
                className="h-full bg-gray-200 w-auto"
              />
            </div>
            <div className="space-y-3 bg-white p-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MailOutlined className="text-lg" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneOutlined className="text-lg" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GlobalOutlined className="text-lg" />
                <a
                  href={`http://${user.website}`}
                  className="text-sm text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://{user.website}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center p-4 bg-gray-50 border-t">
              <div className="flex justify-center items-center">
                <HeartOutlined className="text-red-500 text-xl cursor-pointer" />
              </div>
              <div
                className="flex justify-center items-center border-l border-r border-gray-300"
                onClick={() => handleEdit(user)}
              >
                <EditOutlined className="text-gray-500 text-xl cursor-pointer" />
              </div>
              <div className="flex justify-center items-center">
                <DeleteOutlined className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "Please enter website" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
