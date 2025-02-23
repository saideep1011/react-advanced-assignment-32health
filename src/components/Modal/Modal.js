import React from "react";
import { Modal, Button, Form, Input } from "antd";

const EditUserModal = ({ isModalOpen, onCancel, onOk, form }) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={onCancel}
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
