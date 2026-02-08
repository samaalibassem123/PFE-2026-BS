import api from "@/shared/api/backend";
import type { UserData } from "@/shared/types";

export async function LoginApifn(Data: UserData) {
  const { data } = await api.post<UserData | null>("/auth/login", Data);

  if (!data) {
    return null;
  }
  return data;
}

export async function LogoutApifn() {
  const { data } = await api.post("/auth/logout");
  return data;
}

/**
 * this functions get the current user from the server if he doesn't exist it's means
 * that he is not logged in
 */
export async function AuthMeApifn() {
  const { data } = await api.get("/auth/me");
  if (!data) {
    return null;
  }
  return data;
}
