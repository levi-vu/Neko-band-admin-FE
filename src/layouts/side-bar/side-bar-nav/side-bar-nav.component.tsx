import { Link, Outlet } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import Menu from "../menu/menu.component";
import MenuData from "../menu-data";

type SideBarProps = {
  isCollapsed: boolean;
  collapseHandler: () => void;
};

export default function SideBarNav({
  isCollapsed,
  collapseHandler,
}: SideBarProps) {
  return (
    <div className="test">
      <div className={`side-bar ${isCollapsed ? "collapse" : ""}`}>
        <div style={{ width: "100%" }}>
          {MenuData.map((item, index) => {
            return <Menu menu={item} key={index} />;
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
