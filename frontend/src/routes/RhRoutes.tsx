import RoleRoutesGuard from "@/guards/RoleRoutesGuard";
import { CheckinoutPage } from "@/modules/checkinout";
import { EmployeesPage } from "@/modules/Employees";
import { EmplLeavePage } from "@/modules/Employees-leave";
import { Route } from "react-router-dom";

export default function RhRoutes() {
  return (
    <Route element={<RoleRoutesGuard AllowedRoles={["RH"]} />}>
      <Route path="checkinout" element={<CheckinoutPage />} />
      <Route path="employees" element={<EmployeesPage />} />
      <Route path="employees-leave" element={<EmplLeavePage />} />
    </Route>
  );
}
