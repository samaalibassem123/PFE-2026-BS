import { useAuth } from "@/modules/auth/hooks";
import LoadingPage from "@/shared/pages/LoadingPage";
import type { AvailableRoles } from "@/utils/Roles";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  AllowedRoles: AvailableRoles[];
}

export default function RoleRoutesGuard({ AllowedRoles }: Props) {
  const { data, isPending } = useAuth();
  if (isPending) {
    return <LoadingPage />;
  }
  if (!AllowedRoles.includes(data["role"])) {
    return <Navigate to={"*"} replace />;
  }
  return <Outlet />;
}
