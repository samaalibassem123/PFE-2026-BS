import RoleRoutesGuard from "@/guards/RoleRoutesGuard";
import { MembersPage } from "@/modules/members";
import MembersAttPage from "@/modules/members-att/pages/MembersAttPage";
import { ProjectsPage } from "@/modules/projects";
import { Route } from "react-router-dom";

export default function ProjectmangerRoutes() {
  return (
    <Route element={<RoleRoutesGuard AllowedRoles={["PROJECT MANAGER"]} />}>
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="members" element={<MembersPage />} />
      <Route path="members-att" element={<MembersAttPage />} />
    </Route>
  );
}
