import { Separator } from "@/components/ui/separator";
import UsersSection from "./features/users/UsersSection";
import UsersCardSection from "./features/users-card-infos/UsersCardSection";
import RoleGuardComponents from "@/guards/RoleGuardComponents";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/**
       * CARD INFO SECTION
       */}
      <RoleGuardComponents AllowedRoles={["ADMIN"]}>
        <div className="text-foreground/50">Card informations</div>
        <Separator />
        <UsersCardSection />
      </RoleGuardComponents>

      {/**
       * Users table Section
       */}
      <RoleGuardComponents AllowedRoles={["ADMIN"]}>
        <div className="text-foreground/50">Users Table</div>
        <Separator />
        <UsersSection />
      </RoleGuardComponents>
    </div>
  );
}
