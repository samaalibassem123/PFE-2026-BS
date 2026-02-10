import { useQuery } from "@tanstack/react-query";
import { users_numbers_info_api } from "../api/users-card-info.api";

export const useGetUsersNumbers = () => {
  return useQuery({
    queryKey: ["users-numbers"],
    queryFn: users_numbers_info_api,
  });
};
