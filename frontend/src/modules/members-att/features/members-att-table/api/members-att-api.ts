import type {
  GetMembersAttParams,
  GetMembersAttResponse,
} from "@/modules/members-att/types";
import api from "@/shared/api/backend";

export const get_members_att_fn = async (params: GetMembersAttParams) => {
  const { data } = await api.get<GetMembersAttResponse>(
    "/api/v1/members-att/",
    { params },
  );
  return data;
};
