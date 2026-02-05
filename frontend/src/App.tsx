import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./modules/auth";
import { ThemeProvider } from "@/components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/*Public Routes */}
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*Protected Routes */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
