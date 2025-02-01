import Content from "@/components/shared/content/content";
import { AppSidebar } from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children?: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <Content>{children}</Content>
      </div>
    </SidebarProvider>
  );
}
