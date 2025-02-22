import React from "react";
import { Modal, Form, Input, Button } from "antd";

const EditUserModal = ({ visible, user, onClose, onUpdate }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onUpdate({ ...user, ...values });
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
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
  );
};

export default EditUserModal;
