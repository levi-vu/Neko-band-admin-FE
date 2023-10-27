import { Route, Routes } from "react-router-dom";
import Management from "../../pages/management/index.component";

import SideBar from "../side-bar/side-bar.component";

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<SideBar />}>
				<Route path="" element={<h1>Doanhthu</h1>}></Route>
				<Route path="management" element={<Management />}></Route>
				<Route path="revenue" element={<h1>Doanhthu</h1>}></Route>
			</Route>
		</Routes>
	);
}
