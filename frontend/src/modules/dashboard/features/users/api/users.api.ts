import api from "@/shared/api/backend";
import type { UserCreateSchma, UsersData, UserUpdateData } from "../type";
import type { AvailableRoles } from "@/utils/Roles";

export const create_user_api = async (user: UserCreateSchma) => {
  const { data } = await api.post("/api/v1/user/", user);
  return data;
};

export const delete_user_api = async (user_id: string) => {
  const { data } = await api.delete(`/api/v1/user/${user_id}`);
  return data;
};

export const get_users_api = async (params: {
  limit: number;
  offset: number;
  role: AvailableRoles | "";
  email: string;
}) => {
  const { data } = await api.get<UsersData>("/api/v1/user/", { params });
  return data;
};

export const update_user_api = async (
  user_id: string,
  new_user_data: UserUpdateData,
) => {
  const { data } = await api.put(`/api/v1/user/${user_id}`, new_user_data);
  return data;
};
