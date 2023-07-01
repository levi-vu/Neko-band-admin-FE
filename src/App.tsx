import { Layout, theme } from "antd";
import "./index.scss";
import Router from "./layouts/routers/routers.components";
import SideBar from "./layouts/side-bar/side-bar.component";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Header from "./layouts/header/header.component";

const App = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<SideBar></SideBar>
			<Layout className="site-layout">
				<Header />
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
