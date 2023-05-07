import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuData from "./menu-data.";
import "./side-bar.styles.scss";
import logo from "../../assets/logo.svg";

const SideBar = () => {
  const navigate = useNavigate();
  const firstPath = window.location.pathname.split("/");
  return (
    <Sider collapsible  className='menu-theme' breakpoint='xs'  theme="dark" >
      <div className='logo'>
        <img src={logo} alt='Logo' className='logo-svg' onClick={() => navigate("")} />
      </div>
      <Menu onClick={({ key }) => navigate(key)} selectedKeys={[firstPath[1]]} mode='inline' items={MenuData}  theme="dark" />
    </Sider>
  );
};

export default SideBar;
