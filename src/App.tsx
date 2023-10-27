import { Layout } from "antd";
import "./index.scss";
import Router from "./layouts/routers/routers.components";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
const App = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Provider store={store}>
				<Authenticator hideSignUp className="popup-login">
					<Router></Router>
				</Authenticator>
			</Provider>
		</Layout>
	);
};
export default App;
