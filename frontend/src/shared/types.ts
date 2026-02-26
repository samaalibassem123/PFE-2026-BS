import type { AvailableRoles } from "@/utils/Roles";

export interface UserData {
  id?: string;
  email: string;
  password: string;
  created_at?: string;
  token?: string;
}

export interface GetUserDataSchema {
  id?: string;
  username: string;
  email: string;
  role: AvailableRoles;
  created_at: string;
}
