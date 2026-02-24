import RoleGuardComponents from "@/guards/RoleGuardComponents";
import { AdminProjectTable, PMProjectTable } from "../features/project-table";

export default function ProjectsPage() {
  return (
    <div>
      <RoleGuardComponents AllowedRoles={["ADMIN"]}>
        <AdminProjectTable />
      </RoleGuardComponents>
      <RoleGuardComponents AllowedRoles={["PROJECT_MANAGER"]}>
        <PMProjectTable />
      </RoleGuardComponents>
    </div>
  );
}
