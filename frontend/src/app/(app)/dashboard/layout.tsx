'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MySidebar } from "@/components/sidebar/MySidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MySidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}