import { NavItemType } from "@/types";
import React from "react";
import NavItem from "./menuList/navItem";
import GroupItem from "./menuList/groupItem";
import CollapseItem from "./menuList/collapseItem";

interface NavItemMiddProps {
  navItem: NavItemType;
}

export default function NavItemMidd({ navItem }: NavItemMiddProps) {
  switch (navItem.type) {
    case "group":
        return <GroupItem key={navItem.title} navItem={navItem} />

    case "collapsible":
        return <CollapseItem key={navItem.title} navItem={navItem} />

    case "item":
        return <NavItem key={navItem.title} navItem={navItem} />

    default:
      break;
  }
}
