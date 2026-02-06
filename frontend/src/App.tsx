import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./modules/auth";
import { ThemeProvider } from "@/components/theme-provider";
import MainAppLayout from "./layouts/MainAppLayout";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import PageNotfound from "@/pages/PageNotfound";
import RoleGuard from "./guards/RoleGuard";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/*Public Routes */}
        
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotfound />}/>
        
        {/*Protected Routes */}
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<MainAppLayout/>}>
            <Route path="/dashboard/profile" element={<RoleGuard AllowedRoles={['EMPLOYER', "ADMIN", 'RH']}><p>profile</p></RoleGuard>} />
            <Route path="/dashboard/settings" element={<p>setting</p>} />
          </Route>
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
}

export default App;
