import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import MenuData from "./menu-data.";
import "./side-bar.styles.scss";
import { useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";

const SideBar2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  fetch("https://localhost:7139/api/product", requestOptions)
    .then((response) => console.log(response.json()));
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="menu-theme"
    >
      <div className="logo">
        <img src={ReactLogo} alt="React Logo" />
      </div>
      <Menu
        onClick={({ key }) => navigate(key)}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={MenuData}
        className="menu-container"
      />
    </Sider>
  );
};

export default SideBar2;
