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
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen  bg-white p-3 md:p-4">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {users.map((user) => (
          <div key={user.id} className=" bg-gray-100 border">
            <div className="flex justify-center items-center h-48">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&mood[]=happy`}
                alt={user.name}
                className="h-full bg-gray-200 w-auto "
              />
            </div>
            {/* User Data Section */}
            <div className="space-y-3 bg-white p-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 ">
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
            <div className="grid grid-cols-3 items-center p-4 bg-gray-50">
              <div className="flex justify-center items-center">
                <HeartOutlined className="text-red-500 text-xl cursor-pointer" />
              </div>
              <div className="flex justify-center items-center border-l border-r border-gray-300">
                <EditOutlined className="text-gray-500 text-xl cursor-pointer" />
              </div>
              <div className="flex justify-center items-center">
                <DeleteOutlined className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
