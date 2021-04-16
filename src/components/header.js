import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserDeleteOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const HeaderComponent = () => {
  let udt = JSON.parse(localStorage.getItem("user"))
  console.log(udt)

  if (!udt){
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
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }

  if (udt.role ==="user"){
    return (
      <Header className="header">
         <div style={{ float: 'left', marginRight:"30px", position: 'relative', bottom:'8px'}}>
            <img src="https://img.icons8.com/pastel-glyph/2x/dog--v2.png" width="50"></img>
            <h1 style={{ display: 'inline-block', position: 'relative', top:'8px', marginLeft:'10px'}}>Canine Shleter</h1>
            </div>

        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
         
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/user/conversations">Messages</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/user/favourite">Favourites</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/dashboard">Logout</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }

  return (
    <Header className="header">
       <div style={{ float: 'left', marginRight:"30px", position: 'relative', bottom:'8px'}}>
          <img src="https://img.icons8.com/pastel-glyph/2x/dog--v2.png" width="50"></img>
          <h1 style={{ display: 'inline-block', position: 'relative', top:'8px', marginLeft:'10px'}}>Canine Shleter</h1>
          </div>

      <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
          <Link to="/dashboard">Manage Pets</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard/adoption/">Adoption Requests</Link>
        </Menu.Item>
        
        <Menu.Item key="3">
          <Link to="/user/conversations">Messages</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dashboard">Logout</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
   

  
};
