import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const LoginModal = ({ visible, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Login"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Login
        </Button>,
      ]}
    >
      <Form form={form} name="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter a password' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
