import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./modules/auth";
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

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/*Public Routes */}

        {/* Redirect root to /login */}
        <Route element={<PublicRoutesGuard />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotfound />} />

        {/*Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<MainAppLayout />}>
            <Route index element={<UserIndexRedirect />} />
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
