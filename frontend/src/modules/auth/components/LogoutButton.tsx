import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "../hooks";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const logout = useLogoutMutation();
  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <Button disabled={logout.isPending} onClick={handleLogout}>
      <LogOut /> Logout
    </Button>
  );
}
