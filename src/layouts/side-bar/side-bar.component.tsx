import { useState } from "react";
import { IconContext } from "react-icons";
import MenuData from "./menu-data";
import Menu from "./menu/menu.component";
import "./side-bar.style.scss";

export default function SideBar() {
  const [isCollapsed, setCollapse] = useState(false);

  const collapseSideBar = () => {
    setCollapse(!isCollapsed);
  };
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className={`side-bar ${isCollapsed ? "collapse" : ""}`}>
        <div style={{ width: "100%" }}>
          {MenuData.map((item, index) => {
            return <Menu menu={item} key={index} />;
          })}
        </div>
      </div>
    </IconContext.Provider>
  );
}
