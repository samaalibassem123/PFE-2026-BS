import { Navigate, Route, Routes } from "react-router-dom";
import { Login, OtpPage, Register } from "./modules/auth";
import { ThemeProvider } from "@/components/theme-provider";
import MainAppLayout from "./layouts/MainAppLayout";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import PageNotfound from "@/shared/pages/PageNotfound";
import PublicRoutesGuard from "./guards/PublicRoutesGuard";

import { Toaster } from "./components/ui/sonner";

import ProjectmangerRoutes from "./routes/ProjectmangerRoutes";
import RhRoutes from "./routes/RhRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { UserIndexRedirect } from "./routes/UserIndexRedirect";
import { AssingProjectPage, ProjectsPage } from "./modules/projects";
import RoleRoutesGuard from "./guards/RoleRoutesGuard";
import { MaintainancePage } from "./modules/settings";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/** Maintainance Route */}
        <Route path="/maintenance" element={<MaintainancePage />} />
        {/*Public Routes */}

        {/* Redirect root to /login */}
        <Route element={<PublicRoutesGuard />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>

        <Route path="*" element={<PageNotfound />} />

        {/*Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<MainAppLayout />}>
            <Route index element={<UserIndexRedirect />} />
            <Route
              element={
                <RoleRoutesGuard AllowedRoles={["ADMIN", "PROJECT_MANAGER"]} />
              }
            >
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<AssingProjectPage />} />
            </Route>

            {AdminRoutes()}
            {ProjectmangerRoutes()}
            {RhRoutes()}
            <Route path="profile" element={<p>profile</p>} />
          </Route>
        </Route>
      </Routes>

      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
