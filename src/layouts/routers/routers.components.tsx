import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/login/login.component";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home test</h1>}></Route>
      <Route path="sub-1" element={<h1>Sub 1</h1>}></Route>
      <Route path="doanhthu" element={<h1>Home doanhthu</h1>}></Route>
      <Route path="login" element={<LoginForm />}></Route>
    </Routes>
  );
}
