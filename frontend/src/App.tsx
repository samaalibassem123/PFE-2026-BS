import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./modules/auth";
import { ThemeProvider } from "@/components/theme-provider";
import MainAppLayout from "./layouts/MainAppLayout";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import PageNotfound from "@/shared/pages/PageNotfound";
import PublicRoutesGuard from "./guards/PublicRoutesGuard";
import { DashboardPage } from "./modules/dashboard";
import { Toaster } from "@/components/ui/sonner";

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
            <Route
              path="/user"
              element={<Navigate to="/user/dashboard" replace />}
            />
            <Route path="/user/dashboard" element={<DashboardPage />} />
            <Route path="/user/profile" element={<p>profile</p>} />
            <Route path="/user/settings" element={<p>setting</p>} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
