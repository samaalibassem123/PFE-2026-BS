import { useAuth } from "@/modules/auth/hooks";
import type { AvailableRoles } from "@/utils/Roles";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  AllowedRoles: AvailableRoles[];
}

export default function RoleGuardComponents({ ...props }: Props) {
  const { data } = useAuth();
  if (props.AllowedRoles.includes(data["role"])) {
    return props.children;
  }
  return null;
}
