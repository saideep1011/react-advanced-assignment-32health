import React from "react";
import { Modal, Button, Form, Input } from "antd";

const EditUserModal = ({ isModalOpen, onCancel, onOk, form }) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={onCancel}
      styles={{
        content: { padding: "18px 0px 0px 0px" },
        header: {
          borderBottom: "1px solid #d9d9d9",
          padding: "0",
          paddingLeft: "18px",
          paddingBottom: "18px",
        },
        body: { padding: "10px 24px" },
        footer: { borderTop: "1px solid #d9d9d9", padding: "8px 16px" },
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => onOk(values))
              .catch((info) => console.log("Validation Failed:", info));
          }}
        >
          OK
        </Button>,
      ]}
    >
      <div style={{ marginTop: "16px" }}>
        <Form form={form} layout="horizontal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name!" }]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter an email!" }]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter a Phone Number!" },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              { required: true, message: "Please enter your own website!" },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
