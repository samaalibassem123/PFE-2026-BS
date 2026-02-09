import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { create_user_api, delete_user_api, get_users_api } from "../api/users";
import type { UserData } from "../type";

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: create_user_api,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetUsers = () => {
  return useQuery<UserData[]>({
    queryKey: ["users"],
    queryFn: get_users_api,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: delete_user_api,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted Succefully");
    },
    onError: () =>
      toast.error("Server Error 404", {
        description: "refresh the page or try again",
      }),
  });
};
