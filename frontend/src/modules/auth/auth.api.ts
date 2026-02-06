import api from "@/shared/api/backend";
import type { UserData } from "@/shared/types";

export async function LoginApifn(Data: UserData) {
  const { data } = await api.post<UserData | null>("/api/v1/user/login", Data);

  if (!data) {
    return null;
  }
  return data;
}

export async function LogoutApifn() {
  const res = await api.post("/api/v1/logout");
  return res;
}
