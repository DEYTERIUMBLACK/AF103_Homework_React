import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const EditModal = ({ visible, onCancel, album, onEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const updatedAlbum = { ...album, ...values };
      await axios.put(
        `https://655ba7aeab37729791a9705b.mockapi.io/Albums/${album.id}`,
        updatedAlbum
      );
      onEdit(updatedAlbum);
      message.success("Album updated successfully");
      onCancel();
    } catch (error) {
      message.error("Error updating album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Album"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="edit" type="primary" loading={loading} onClick={handleEdit}>
          Edit
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          name: album?.name,
          artistName: album?.artistName,
          year: album?.year,
        }}
      >
        <Form.Item
          name="name"
          label="Album Name"
          rules={[{ required: true, message: "Please enter the album name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="artistName"
          label="Artist Name"
          rules={[{ required: true, message: "Please enter the artist name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Please enter the year" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
