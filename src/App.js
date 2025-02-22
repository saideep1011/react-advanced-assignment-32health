import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import UserCard from "./components/Card/Card";
import EditUserModal from "./components/Modal/Modal";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
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
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onEdit={handleEdit} />
        ))}
      </div>

      <EditUserModal
        visible={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
}

export default App;
