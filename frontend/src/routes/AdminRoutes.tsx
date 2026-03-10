import RoleRoutesGuard from "@/guards/RoleRoutesGuard";
import { DashboardPage } from "@/modules/dashboard";
import { PendingPage } from "@/modules/pending-users";

import { Navigate, Route } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <Route element={<RoleRoutesGuard AllowedRoles={["ADMIN"]} />}>
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="settings" element={<p>setting</p>} />
      <Route path="pendings" element={<PendingPage/>} />
    </Route>
  );
}
