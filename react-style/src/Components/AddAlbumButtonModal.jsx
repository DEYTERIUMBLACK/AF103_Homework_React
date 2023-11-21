import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddAlbumButtonModal = ({ onAddAlbum }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFinish = async (values) => {
    onAddAlbum(values);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Album
      </Button>
      <Modal
        title="Add Album"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add Album
          </Button>,
        ]}
      >
        <Form form={form} name="add-album-form" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Album Name"
            rules={[{ required: true, message: 'Please enter the album name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="artistName"
            label="Artist Name"
            rules={[{ required: true, message: 'Please enter the artist name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please enter the release year' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="albumCover"
            label="Album Cover URL"
            rules={[{ required: true, message: 'Please enter the album cover URL' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAlbumButtonModal;
