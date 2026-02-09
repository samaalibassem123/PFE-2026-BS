import api from "@/shared/api/backend";
import type { UserCreateSchma, UserData } from "../type";

export const create_user_api = async (user: UserCreateSchma) => {
  const { data } = await api.post("/api/v1/user/", user);
  return data;
};

export const delete_user_api = async (user_id: string) => {
  const { data } = await api.delete(`/api/v1/user/${user_id}`);
  return data;
};

export const get_users_api = async () => {
  const { data } = await api.get<UserData[]>("/api/v1/user/");
  return data;
};
