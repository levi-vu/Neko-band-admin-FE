import SideBar from "./layouts/side-bar/side-bar.component";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.scss";
import Header from "./layouts/header/header.component";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route index element={<h1>Home test</h1>}></Route>
          <Route path="doanhthu" element={<h1>Home doanhthu</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
export default App;
