import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import MenuData from "./menu-data.";
import "./side-bar.styles.scss";
import logo from "../../assets/logo.svg";
import Header from "../header/header.component";
import { useAuthHeader } from "react-auth-kit";
import { useEffect } from "react";
import { AxiosInstance, setAxiosInterceptors } from "../../utils/http-helper";

const SideBar = () => {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const firstPath = window.location.pathname.split("/");
	useEffect(() => {
		AxiosInstance.defaults.headers.Authorization = authHeader();
		setAxiosInterceptors();
	}, [authHeader()]);

	return (
		<>
			<Layout className="site-layout">
				<Sider collapsible breakpoint="xs" width={"12vw"}>
					<div className="logo">
						<img src={logo} alt="Logo" className="logo-svg" onClick={() => navigate("")} />
					</div>
					<Menu theme="dark" onClick={({ key }) => navigate(key)} selectedKeys={[firstPath[1]]} mode="inline" items={MenuData} />
				</Sider>
				<div className="content">
					<Header />
					<Outlet />
				</div>
			</Layout>
		</>
	);
};

export default SideBar;
