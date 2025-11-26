"use client";

import * as React from "react";
import {
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Sites",
      url: "/sites",
      icon: SquareTerminal,
      items: [
        { title: "Todos os Sites", url: "/sites" },
        { title: "Criar Site", url: "/sites/novo" },
      ],
    },
    {
      title: "Layouts",
      url: "/layouts",
      icon: Frame,
      items: [
        { title: "Todos os Layouts", url: "/layouts" },
        { title: "Criar Layout", url: "/layouts/novo" },
      ],
    },
    {
      title: "Páginas",
      url: "/paginas",
      icon: Map,
      items: [
        { title: "Todas as Páginas", url: "/paginas" },
        { title: "Criar Página", url: "/paginas/novo" },
      ],
    },
    {
      title: "Componentes",
      url: "/componentes",
      icon: Command,
      items: [
        { title: "Todos os Componentes", url: "/componentes" },
        { title: "Criar Componente", url: "/componentes/novo" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Construtor de Sites</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
