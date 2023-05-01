import { ReactNode } from "react";

export type MenuType = {
  path: string;
  title: string;
  icon: ReactNode;
  iconClosed: ReactNode;
  iconOpened: ReactNode;
  subMenu: MenuType[];
};
