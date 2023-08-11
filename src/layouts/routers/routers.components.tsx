import { Route, Routes } from "react-router-dom";
import Management from "../../pages/management/index.component";
import LoginPage from "../../pages/login/login.component";
import SideBar from "../side-bar/side-bar.component";
import { RequireAuth } from "react-auth-kit";
import RequireAuthenticate from "../../components/require-authenticate/require-authenticate";

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<RequireAuthenticate children={<SideBar />} />}>
				<Route path="" element={<h1>Doanhthu</h1>}></Route>
				<Route path="management" element={<Management />}></Route>
				<Route path="revenue" element={<h1>Doanhthu</h1>}></Route>
			</Route>

			<Route path="login" element={<LoginPage />}></Route>
		</Routes>
	);
}
