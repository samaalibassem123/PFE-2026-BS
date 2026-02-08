import { useAuth } from "@/modules/auth/hooks";
import LoadingPage from "@/shared/pages/LoadingPage";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutesGuard() {
  const { data, isPending } = useAuth();
  if (isPending) {
    return <LoadingPage />;
  }
  if (data) {
    return <Navigate to={"/user/dashboard"} replace />;
  }
  return <Outlet />;
}
