import type { GetUserDataSchema } from "@/shared/types";
import type { AvailableRoles } from "@/utils/Roles";

export interface UserCreateSchma {
  username: string;
  email: string;
  role: AvailableRoles;
  password: string;
}

export interface UsersData {
  total: number;
  data: GetUserDataSchema[];
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
export interface UsersNumbers {
  total_users: number;
  total_admins: number;
  total_rh: number;
  total_projectM: number;
}
