import type { AvailableRoles } from "@/utils/Roles";

export interface UserCreateSchma {
  username: string;
  email: string;
  role: AvailableRoles;
  password: string;
}

export interface UserData {
  id?: string;
  username: string;
  email: string;
  role: AvailableRoles;
  created_at: string;
}

export interface UserUpdateData {
  username: string;
  email: string;
  role: AvailableRoles;
}

export type userUpdateArgs = {
  user_id: string;
  new_user_data: UserUpdateData;
};
