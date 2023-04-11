import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { MenuType } from "../../types/menu-type.type";

const MenuData: MenuType[] = [
  {
    title: "Quản lý",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subMenu: [{
      title: "sub 1",
      path: "/sub-1",
      iconClosed: <></>,
      iconOpened: <></>,
      icon: <></>,
      subMenu: [],
    },],
  },
  {
    title: "Doanh Thu",
    path: "/doanhthu",
    iconClosed: <></>,
    iconOpened: <></>,
    icon: <></>,
    subMenu: [],
  },
];

export default MenuData;
