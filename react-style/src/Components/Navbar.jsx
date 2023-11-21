import React, { useState } from "react";
import { Layout, Button, Row, Col, message } from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import axios from "axios";
import RegistrationModal from "./RegistrationModal";
import LoginModal from "./LoginModal";
import LogoutButton from "./LogoutButton";
import AddAlbumButtonModal from "./AddAlbumButtonModal";

const { Header, Content } = Layout;
const Navbar = () => {
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const showRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const handleRegisterCancel = () => {
    setRegisterModalVisible(false);
  };
  const handleAddAlbum = async (albumData) => {
    try {
      const response = await axios.post(
        "https://655ba7aeab37729791a9705b.mockapi.io/Albums",
        {
          createdAt: new Date().toISOString(),
          ...albumData,
        }
      );

      console.log("Album added successfully:", response.data);

      message.success("Album added successfully.");
    } catch (error) {
      console.error("Error adding album:", error);
      message.error("Failed to add album. Please try again.");
    }
  };
  const handleRegisterFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://655ba7aeab37729791a9705b.mockapi.io/Users",
        {
          createdAt: new Date().toISOString(),
          name: values.name,
          email: values.email,
          password: values.password,
          wishlistItems: [],
        }
      );

      console.log("Registration successful:", response.data);

      setRegisterModalVisible(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLoginCancel = () => {
    setLoginModalVisible(false);
  };

  const handleLoginFinish = async (values) => {
    try {
      const response = await axios.get(
        "https://655ba7aeab37729791a9705b.mockapi.io/Users",
        {
          params: {
            email: values.email,
            password: values.password,
          },
        }
      );

      if (response.data.length > 0) {
        setLoggedInUser(response.data[0].name);
        message.success(`Welcome, ${response.data[0].name}!`);
      } else {
        message.error("Invalid credentials. Please try again.");
      }

      setLoginModalVisible(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    message.success("Successfully logged out.");
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "#1976D2", padding: "0" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: "0 16px" }}
        >
          <Col>
            <Button type="link" style={{ color: "white" }}>
              <h1
                style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
              >
                Album Layout
              </h1>
            </Button>
          </Col>
          <Col>
            {loggedInUser ? (
              <>
                <span
                  style={{ color: "white", marginRight: "16px" }}
                >{`Welcome, ${loggedInUser}!`}</span>
                <LogoutButton onLogout={handleLogout} />
                <AddAlbumButtonModal onAddAlbum={handleAddAlbum} />
              </>
            ) : (
              <>
                <Button
                  type="link"
                  style={{ color: "white" }}
                  icon={<UserOutlined />}
                  onClick={showLoginModal}
                >
                  Login
                </Button>
                <Button
                  type="primary"
                  ghost
                  icon={<SolutionOutlined />}
                  style={{
                    backgroundColor: "#2196F3",
                    borderColor: "#2196F3",
                    color: "white",
                  }}
                  onClick={showRegisterModal}
                >
                  Sign up
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <RegistrationModal
          visible={registerModalVisible}
          onCancel={handleRegisterCancel}
          onFinish={handleRegisterFinish}
        />
        <LoginModal
          visible={loginModalVisible}
          onCancel={handleLoginCancel}
          onFinish={handleLoginFinish}
        />
      </Content>
    </Layout>
  );
};

export default Navbar;
