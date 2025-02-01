import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItemType } from "@/types";
import React from "react";
import NavItemMidd from "../Middleware-navItem";

interface GroupItemProps {
  navItem: NavItemType;
}

export default function GroupItem({ navItem }: GroupItemProps) {
  return (
    <SidebarGroup>
      {navItem.title && <SidebarGroupLabel>{navItem.title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          {navItem.items?.map((item) => (
            <NavItemMidd key={item.title} navItem={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
