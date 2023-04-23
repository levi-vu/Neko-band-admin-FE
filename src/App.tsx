import { Layout } from "antd";
import "./index.scss";
import Header from "./layouts/header/header.component";
import Router from "./layouts/routers/routers.components";
import SideBar from "./layouts/side-bar/side-bar.component";

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar></SideBar>
      <Layout className="site-layout">
        <Header></Header>
        <div className="content">
          <Router></Router>
        </div>
      </Layout>
    </Layout>
export default App;
