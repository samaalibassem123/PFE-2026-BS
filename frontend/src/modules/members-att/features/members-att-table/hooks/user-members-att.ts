import { useQuery } from "@tanstack/react-query";
import { get_members_att_fn } from "../api/members-att-api";
import type {
  GetMembersAttParams,
  GetMembersAttResponse,
} from "@/modules/members-att/types";

export const useMembersAtt = (params: GetMembersAttParams) => {
  return useQuery<GetMembersAttResponse>({
    queryKey: ["members-att", params],
    queryFn: () => get_members_att_fn(params),
  });
};
