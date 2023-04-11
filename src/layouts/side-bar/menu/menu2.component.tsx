import { MenuProps } from "antd";

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

const Menus: MenuItem[] = [
  getMenu("Option 1", "/doanhthu", <h1>tesst</h1>),
  getMenu("Option 2", "2", <h1>Option2</h1>),
  getMenu("User", "sub1", <h1>Option1</h1>, [
    getMenu("Tom", "3"),
    getMenu("Bill", "4"),
    getMenu("Alex", "5"),
  ]),
  getMenu("Team", "sub2", <h1>sub2</h1>, [
    getMenu("Team 1", "6"),
    getMenu("Team 2", "8"),
  ]),
  getMenu("Files", "9", <h1>sub3</h1>),
];

export default Menus;
