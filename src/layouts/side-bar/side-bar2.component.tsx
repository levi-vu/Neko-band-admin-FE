import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import Menus from "./menu/menu2.component";
import "./side-bar2.styles.scss";
import { useNavigate } from "react-router-dom";

const SideBar2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        onClick={({ key }) => navigate(key)}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={Menus}
      />
    </Sider>
  );
};

export default SideBar2;
