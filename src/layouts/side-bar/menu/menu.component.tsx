import { useState } from "react";
import { MenuType } from "../../../types/menu-type.type";
import { Link } from "react-router-dom";
import './menu.styles.scss';


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
      <div className="menu">
        <Link to={props.menu.path} onClick={props.menu.subMenu && showSubMenu}>
          <div>
            {props.menu.icon}
            <span className="menu-title">{props.menu.title}</span>
          </div>
          <div className="menu-icon">{showIcon(props.menu)}</div>
        </Link>
      </div>
      {subMenu &&
        props.menu.subMenu.map((item, index) => {
          return (
            <div className="sub-menu" key={index}>
              <Link to={item.path}>
                {item.icon}
                <span className="menu-title">{item.title}</span>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Menu;
