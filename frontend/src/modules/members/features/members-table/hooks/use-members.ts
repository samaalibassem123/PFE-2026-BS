import type {
  GetMembersResponse,
  GetMembersParams,
} from "@/modules/members/types";
import { useQuery } from "@tanstack/react-query";
import { get_members_fn } from "../api/memebers-api";

export const useMembers = (params: GetMembersParams) => {
  return useQuery<GetMembersResponse>({
    queryKey: ["project-members", params],
    queryFn: () => get_members_fn(params),
  });
};
