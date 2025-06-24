"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import MySidebar from "@/components/sidebar/MySidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const itens = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Concentração",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Minhas tasks",
      url: "#",
      icon: Search,
    },
    {
      title: "Categorias",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <MySidebar itens={itens}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
