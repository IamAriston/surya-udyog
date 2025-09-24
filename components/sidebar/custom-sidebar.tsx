"use client";

import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "../navbar/site-header";

interface SidebarProps {
  children: React.ReactNode;
}

const CustomSidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      {pathname !== "/login" && <AppSidebar variant="inset" />}
      <SidebarInset>
        {pathname !== "/login" && <SiteHeader />}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CustomSidebar;
