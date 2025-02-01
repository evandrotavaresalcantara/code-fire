import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import React from "react";
import { NavItemType } from "@/types";
import Link from "next/link";

export interface NavItemProps {
  navItem: NavItemType;
}

export default function NavItem({navItem}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={navItem.url!} className="flex pl-6 py-5 justify-start">
          <div className="h-5 w-5 mr-2">
            <navItem.icon className="h-5 w-5" />
          </div>
          <span className="text-base mr-2">{navItem.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
