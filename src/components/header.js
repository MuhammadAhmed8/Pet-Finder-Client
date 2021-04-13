import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

export const HeaderComponent = () => {
  if (localStorage.getItem("user"))
    return (
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/user/conversations">Messages</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/user/favourite">Favourites</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dashboard/adoption">Adoption Requests</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3">
          {" "}
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
