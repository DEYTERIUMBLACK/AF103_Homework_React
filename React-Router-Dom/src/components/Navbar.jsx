import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="admin" icon={<UserOutlined />}>
          <Link to="/admin/dashboard">Admin</Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="contact" icon={<ContactsOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
