import { useState } from "react";
import "./side-bar.style.scss";
import { IconContext } from "react-icons";
import SideBarNav from "./side-bar-nav/side-bar-nav.component";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function SideBar() {
  const [collapse, setCollapse] = useState(false);

  const collapseSideBar = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="header-container">
          <Link to="/">
            <AiOutlineHome className="icon-home" />
          </Link>
        </div>
        <SideBarNav isCollapsed={collapse} collapseHandler={collapseSideBar} />
      </IconContext.Provider>
    </>
  );
}
