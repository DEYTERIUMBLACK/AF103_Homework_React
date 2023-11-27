import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DashboardPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Dashboard</Title>
      <p>This is the Dashboard page content.</p>
    </div>
  );
};

export default DashboardPage;
