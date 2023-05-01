import { MenuProps } from "antd";
import { AiFillSkin, AiFillHome } from "react-icons/ai";
import { GiReceiveMoney} from 'react-icons/gi';

type MenuItem = Required<MenuProps>["items"][number];

function getMenu(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MenuData: MenuItem[] = [
  getMenu('Dashboard', '', <AiFillHome />),
  getMenu('Kho', 'management', <AiFillSkin />),
  getMenu('Doanh thu', 'revenue', <GiReceiveMoney />),
  getMenu('test', 'form', <GiReceiveMoney />)
];

export default MenuData;
