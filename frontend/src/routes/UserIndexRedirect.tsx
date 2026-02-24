import { useAuth } from "@/modules/auth/hooks";
import LoadingPage from "@/shared/pages/LoadingPage";
import { Navigate } from "react-router-dom";

const roleDashboardMap: Record<string, string> = {
  ADMIN: "dashboard",
  PROJECT_MANAGER: "projects",
  RH: "checkinout",
};

export function UserIndexRedirect() {
  const { data, isPending } = useAuth();

  if (isPending) {
    return <LoadingPage />;
  }
  const path = roleDashboardMap[data["role"]];

  return <Navigate to={path || "/unauthorized"} replace />;
}
