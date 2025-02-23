import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";

const UserCard = ({ user, onEdit, onDelete }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-100 border">
      <div className="flex justify-center items-center h-48">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&mood[]=happy`}
          alt={user.name}
          className="h-full bg-gray-200 w-auto"
        />
      </div>
      <div className="space-y-2 bg-white p-2 pl-6 pb-7 ">
        <h2 className="text-l font-semibold mt-4 text-gray-800">{user.name}</h2>
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
            {user.website}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center  p-4 bg-gray-50 border-t">
        {/* Like Button */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <HeartFilled className="text-red-500 text-xl" />
          ) : (
            <HeartOutlined className="text-red-500 text-xl" />
          )}
        </div>
        {/* Edit Button */}
        <div
          className="flex justify-center items-center border-l border-r border-gray-300 cursor-pointer"
          onClick={() => onEdit(user)}
        >
          <EditOutlined className="text-gray-500 text-xl hover:text-blue-500" />
        </div>
        {/* Delete Button */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => onDelete(user.id)}
        >
          <DeleteFilled className="text-gray-500 text-xl hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
