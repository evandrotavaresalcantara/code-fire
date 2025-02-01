import React from "react";
import UserProfileSection from "./user-profile-section";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Cabecalho() {
  return (
    <div className="bg-black h-[175px] flex-none flex justify-center items-center">
      <SidebarTrigger />
      <div className=" flex flex-1 justify-between items-center">
        {/* <span className="text-2xl">Administrador</span> */}
        <span className="text-2xl"></span>
        <div className="flex gap-3 items-center px-2">
          <UserProfileSection />
        </div>
      </div>
    </div>
  );
}
