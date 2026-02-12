import RoleGuardComponents from "@/guards/RoleGuardComponents";
import { UsersCardSection, UsersSection } from "./features/users";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/**
       * Users INFO SECTION
       */}
      <RoleGuardComponents AllowedRoles={["ADMIN"]}>
        <UsersCardSection />
      </RoleGuardComponents>

      {/**
       * Users table Section
       */}
      <RoleGuardComponents AllowedRoles={["ADMIN"]}>
        <UsersSection />
      </RoleGuardComponents>
    </div>
  );
}
