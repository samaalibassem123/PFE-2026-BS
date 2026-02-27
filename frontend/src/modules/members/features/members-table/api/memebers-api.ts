import type {
  GetMembersParams,
  GetMembersResponse,
} from "@/modules/members/types";
import api from "@/shared/api/backend";

export const get_members_fn = async (params: GetMembersParams) => {
  const { data } = await api.get<GetMembersResponse>("/api/v1/members/", {
    params,
  });
  return data;
};
