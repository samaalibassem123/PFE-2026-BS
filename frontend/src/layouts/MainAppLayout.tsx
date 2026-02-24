import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/modules/auth/hooks";
import type { AvailableRoles } from "@/utils/Roles";

import {
  Clock,
  DoorOpen,
  Folder,
  LayoutDashboard,
  Settings,
  User,
  Users,
} from "lucide-react";
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
    RoleView: ["ADMIN"],
  },
  {
    link: "/user/checkinout",
    icon: <Clock className={IconStyle} />,
    label: "Check in-out",
    RoleView: ["RH"],
  },
  {
    link: "/user/projects",
    icon: <Folder className={IconStyle} />,
    label: "Projects",
    RoleView: ["PROJECT_MANAGER", "ADMIN"],
  },
  {
    link: "/user/employees",
    icon: <Users className={IconStyle} />,
    label: "Employees",
    RoleView: ["RH"],
  },
  {
    link: "/user/members",
    icon: <Users className={IconStyle} />,
    label: "Members",
    RoleView: ["PROJECT_MANAGER"],
  },
  {
    link: "/user/employees-leave",
    icon: <DoorOpen className={IconStyle} />,
    label: "Employees Leave",
    RoleView: ["RH"],
  },
  {
    link: "/user/members-att",
    icon: <DoorOpen className={IconStyle} />,
    label: "Members Attendace",
    RoleView: ["PROJECT_MANAGER"],
  },
  {
    link: "/user/profile",
    icon: <User className={IconStyle} />,
    label: "Profile",
    RoleView: ["ADMIN", "RH", "PROJECT_MANAGER"],
  },
  {
    link: "/user/settings",
    icon: <Settings className={IconStyle} />,
    label: "Settings",
    RoleView: ["ADMIN"],
  },
];

export default function MainAppLayout() {
  const { data } = useAuth();
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
                    item.RoleView.includes(data.role) && (
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
        <header className="flex h-16 items-center gap-2 px-4 border-b sticky top-0 backdrop-blur-2xl">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold capitalize">{location}</h1>
          <Badge className="text-xs" variant={"secondary"}>
            {data.role}
          </Badge>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
