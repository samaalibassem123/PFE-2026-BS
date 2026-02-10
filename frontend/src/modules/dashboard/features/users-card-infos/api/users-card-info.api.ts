import api from "@/shared/api/backend";
import type { UsersNumbers } from "../types";

export const users_numbers_info_api = async () => {
  const { data } = await api.get<UsersNumbers>("/api/v1/user/numbers");
  return data;
};
