import React, { useState } from "react";
import { Popconfirm, Button, message } from "antd";
import axios from "axios";

const DeleteButton = ({ onDelete, albumId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://655ba7aeab37729791a9705b.mockapi.io/Albums/${albumId}`);
      onDelete(albumId);
      message.success("Album deleted successfully");
    } catch (error) {
      message.error("Error deleting album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this album?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger" loading={loading}>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
