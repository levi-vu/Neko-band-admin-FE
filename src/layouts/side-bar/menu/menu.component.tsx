import { useState } from "react";
import { MenuType } from "../../../types/menu-type.type";
import { Link, NavLink } from "react-router-dom";
import "./menu.styles.scss";

const Menu = (props: { menu: MenuType }) => {
  const [subMenu, setSubMenu] = useState(false);

  const showSubMenu = () => setSubMenu(!subMenu);

  const showIcon = (menu: MenuType) => {
    if (menu.subMenu && subMenu) {
      return menu.iconOpened;
    }
    return menu.subMenu ? menu.iconClosed : null;
  };

  return (
    <>
      <div className="menu" onClick={props.menu.subMenu && showSubMenu}>
        <NavLink to={props.menu.path} className={({isActive}) => isActive ? "active" : ""}>
          {props.menu.icon}
          <span className="menu-title">{props.menu.title}</span>
        </NavLink>
        <div className="menu-icon">
          {showIcon(props.menu)}
        </div>
      </div>
      {subMenu
        ? props.menu.subMenu.map((item, index) => {
            return (
              <div className="sub-menu" key={index}>
                <NavLink to={item.path} className={({isActive}) => isActive ? "active" : ""}>
                  {item.icon}
                  <span className="menu-title">{item.title}</span>
                </NavLink>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Menu;
