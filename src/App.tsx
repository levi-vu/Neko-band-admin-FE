import SideBar from "./layouts/side-bar/side-bar.component";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Header from "./layouts/header/header.component";
import Router from "./layouts/routers/routers.components";
import SideBar2 from "./layouts/side-bar/side-bar2.component";
import { Layout } from "antd";

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar2></SideBar2>
      <Layout className="site-layout">
        <Header></Header>
        <Router></Router>
      </Layout>
    </Layout>
export default App;
