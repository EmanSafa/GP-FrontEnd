import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./App-Sidebar";
import type { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const ShopPage = ({ children }: IProps) => {
  return (
    <SidebarProvider className="mt-3">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default ShopPage;
