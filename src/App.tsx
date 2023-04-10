import React, { useState } from "react";
import "./index.css";
import { FundFilled, FileOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Lottie from "lottie-react";
import Appy from "./assets/appy.json"; 

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Mạnh Quốc", "1", <PieChartOutlined />),
  getItem("Yêu", "2", <FundFilled />),
  getItem("Bảo Trâm", "3", <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Lottie
          style={{
            height: 32,
            margin: 16,
          }} animationData={Appy}        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "0 16px" }}></Content>
        <Footer style={{ textAlign: "center" }}>© 2022 by Levi.vu.</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
