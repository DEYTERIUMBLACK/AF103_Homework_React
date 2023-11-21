import React from 'react';
import { Button } from 'antd';

const LogoutButton = ({ onLogout }) => {
  return (
    <Button type="link" color='white' onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
