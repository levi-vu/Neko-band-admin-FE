import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import MenuData from "./menu-data.";
import "./side-bar.styles.scss";
import {useNavigate} from "react-router-dom";
import ReactLogo from "../../assets/react.svg";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='menu-theme' breakpoint='xs'>
      <div className='logo'>
        <img src={ReactLogo} alt='React Logo' />
      </div>
      <Menu onClick={({key}) => navigate(key)} defaultSelectedKeys={["form"]} mode='inline' items={MenuData} theme='dark' />
    </Sider>
  );
};

export default SideBar;
