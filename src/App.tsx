import { Layout, theme } from "antd";
import "./index.scss";
import Router from "./layouts/routers/routers.components";
import SideBar from "./layouts/side-bar/side-bar.component";
import { Header } from "antd/es/layout/layout";
import { store } from "./store/store";
import { Provider } from "react-redux";

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<SideBar></SideBar>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<div className="content">
					<Provider store={store}>
						<Router></Router>
					</Provider>
	
				</div>
			</Layout>
		</Layout>
	);
};
export default App;
