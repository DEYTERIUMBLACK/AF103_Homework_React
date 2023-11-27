import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { DashboardOutlined, AppstoreOutlined, PlusOutlined } from '@ant-design/icons';

const AdminNavbar = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="categories" icon={<AppstoreOutlined />}>
        <Link to="/admin/categories">Categories</Link>
      </Menu.Item>
      <Menu.Item key="add" icon={<PlusOutlined />}>
        <Link to="/admin/add">Add</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminNavbar;