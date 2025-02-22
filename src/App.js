import React, { useEffect, useState } from "react";
import axios from "axios";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-blue-500 rounded-lg  shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-center items-center h-40 bg-red-500">
              <img
                src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                alt={user.name}
                className="h-full w-auto  shadow-lg"
              />
            </div>

            <div className="space-y-3 bg-green-500 p-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 ">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MailOutlined className="text-lg" />
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <PhoneOutlined className="text-lg" />
                <span className="text-sm">
                  {user.phone} • s{user.id}
                </span>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
