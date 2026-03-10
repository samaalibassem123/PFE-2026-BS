import api from "@/shared/api/backend";
import type { PendingUserData } from "../pending-users/types";


export const pend_user_api = async (params: PendingUserData) => {
  const { data } = await api.post("/api/pending-users/", params);
  return data;
};
