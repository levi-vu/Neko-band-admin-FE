import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/login/login.component";
import Management from "../../pages/management/management.component";
import CreateProduct from "../../pages/management/create-product/create-product.component";

export default function Router() {
  return (
    <Routes>
      <Route path="" element={<h1>Dashboard</h1>}></Route>
      <Route path="management" element={<Management />}></Route>
      <Route path="revenue" element={<h1>Doanhthu</h1>}></Route>
      <Route path="form" element={<CreateProduct />}></Route>
    </Routes>
  );
}
