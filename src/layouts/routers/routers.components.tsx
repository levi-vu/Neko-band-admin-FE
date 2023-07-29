import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Management = lazy(() => import("../../pages/management/index.component"));
export default function Router() {
	return (
		<Routes>
			<Route path="" element={<h1>Dashboard</h1>}></Route>
			<Route path="management" element={<Management />}></Route>
			<Route path="revenue" element={<h1>Doanhthu</h1>}></Route>
		</Routes>
	);
}
