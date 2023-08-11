import { Layout } from "antd";
import "./index.scss";
import Router from "./layouts/routers/routers.components";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AuthProvider from "react-auth-kit/dist/AuthProvider";

const App = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure>
				<Provider store={store}>
					<Router></Router>
				</Provider>
			</AuthProvider>
		</Layout>
	);
};
export default App;
