import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
import MenuData from "./menu-data.";
import "./side-bar.styles.scss";
import logo from "../../assets/logo.svg";

const SideBar = () => {
	const navigate = useNavigate();
	const firstPath = window.location.pathname.split("/");
	return (
		<Sider collapsible breakpoint="xs" width={"12vw"}>
			<div className="logo">
				<img src={logo} alt="Logo" className="logo-svg" onClick={() => navigate("")} />
			</div>
			<Menu theme="dark" onClick={({ key }) => navigate(key)} selectedKeys={[firstPath[1]]} mode="inline" items={MenuData} />
		</Sider>
	);
};

export default SideBar;
