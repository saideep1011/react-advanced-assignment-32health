import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const UserCard = ({ user, onEdit, onDelete, onLike }) => {
  return (
    <Card
      style={{ backgroundColor: "#FAFAFA", padding: 0 }}
      styles={{ body: { padding: 0 } }}
      actions={[
        <span key="heart" onClick={() => onLike(user.id)}>
          {user.liked ? (
            <HeartFilled style={{ color: "#eb2f96", fontSize: 18 }} />
          ) : (
            <HeartOutlined style={{ color: "#eb2f96", fontSize: 18 }} />
          )}
        </span>,
        <EditOutlined
          key="edit"
          onClick={() => onEdit(user)}
          style={{ fontSize: 18 }}
        />,
        <DeleteFilled
          key="delete"
          onClick={() => onDelete(user.id)}
          style={{ fontSize: 18 }}
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

        <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
          <h3 style={{ marginBottom: 8, fontWeight: 600, marginLeft: 16 }}>
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
              <span style={{ fontSize: 14, marginLeft: 4 }}>{user.email}</span>
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
              <span style={{ fontSize: 14, marginLeft: 4 }}>{user.phone}</span>
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
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14,
                  textDecoration: "none",
                  marginLeft: 4,
                  color: "#4B5563",
                }}
              >
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
