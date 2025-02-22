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
      title={<div className="w-full pb-2">Basic Modal</div>}
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
      <Form form={form} layout="horizontal" className="w-full">
        <Form.Item
          label="Name"
          name="name"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input className="w-80" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input className="w-80" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input className="w-80" />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "Please enter website" }]}
        >
          <Input className="w-80" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
