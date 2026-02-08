import type { AvailableRoles } from "@/utils/Roles";

export interface UserCreateSchma {
  username: string;
  email: string;
  role: AvailableRoles;
  password: string;
}
