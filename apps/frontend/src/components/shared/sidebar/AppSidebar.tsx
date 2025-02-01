import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";

import { navItems } from "./navItems";
import NavItemMidd from "./Middleware-navItem";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader className="bg-black ">
        <div className="flex flex-col gap-2 h-[152px] justify-center items-center">
          <Image src={Logo} alt="Logo" width={90} />
          <Image src={Logotipo} alt="Logotipo" width={90} />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <div>
          {navItems.map((item) => (
            <NavItemMidd key={item.id} navItem={item} />
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
