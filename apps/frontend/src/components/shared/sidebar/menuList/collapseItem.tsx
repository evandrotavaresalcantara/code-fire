import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavItemType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CollapseItemProps {
  navItem: NavItemType;
}

export default function CollapseItem({ navItem }: CollapseItemProps) {
  return (
    <Collapsible
      key={navItem.title}
      asChild
      defaultOpen
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={navItem.title} className="px-6">
            <div className="h-5 w-5 mr-2">
              {navItem.icon && <navItem.icon className="h-5 w-5" />}
            </div>
            <span className="text-base mr-2">{navItem.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-5">
          <SidebarMenuSub>
            {navItem.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.url!}>
                    <div className="h-3 w-3 ">
                      <subItem.icon className="h-3 w-3 text-zinc-300 " />
                    </div>
                    <span className="pl-2 text-zinc-400">{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
