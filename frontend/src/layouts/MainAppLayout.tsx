import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LogoutButton from "@/modules/auth/components/LogoutButton";
import type { AvailableRoles } from "@/utils/Roles";

import { LayoutDashboard, Settings, User } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const IconStyle: string = "mr-2 h-4 w-4";

interface NavigationItem {
  link: string;
  icon: React.ReactNode;
  label: string;
  RoleView: AvailableRoles[];
}

const Navigations: NavigationItem[] = [
  {
    link: "/user/dashboard",
    icon: <LayoutDashboard className={IconStyle} />,
    label: "Dashboard",
    RoleView: ["ADMIN", "RH", "EMPLOYER"],
  },
  {
    link: "/user/profile",
    icon: <User className={IconStyle} />,
    label: "Profile",
    RoleView: ["ADMIN", "RH", "EMPLOYER"],
  },
  {
    link: "/user/settings",
    icon: <Settings className={IconStyle} />,
    label: "Settings",
    RoleView: ["ADMIN"],
  },
];

const Role = "ADMIN";

export default function MainAppLayout() {
  const { pathname } = useLocation();
  const location = pathname.split("/")[2] ?? "Dashboard";

  return (
    <SidebarProvider>
      <Sidebar>
        {/* Header */}
        <SidebarHeader>
          <h2 className="text-lg font-semibold px-2">TBS</h2>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/**Navigations */}
                {Navigations.map(
                  (item) =>
                    item.RoleView.includes(Role) && (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild>
                          <Link to={item.link}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <LogoutButton />
          <p className="text-xs text-muted-foreground px-2">© 2026</p>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold capitalize">{location}</h1>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
