import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  create_user_api,
  delete_user_api,
  get_users_api,
  update_user_api,
} from "../api/users.api";
import type { UsersData, userUpdateArgs } from "../type";

import { getErrorMessage } from "@/shared/api/backend";
import type { AvailableRoles } from "@/utils/Roles";

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: create_user_api,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      client.invalidateQueries({ queryKey: ["users-numbers"] });
    },
  });
};

export const useGetUsers = (params: {
  limit: number;
  offset: number;
  role: AvailableRoles | "";
  email: string;
}) => {
  return useQuery<UsersData>({
    queryKey: ["users", params],
    queryFn: () => get_users_api(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: delete_user_api,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      client.invalidateQueries({ queryKey: ["users-numbers"] });
      toast.success("User deleted Succefully");
    },
    onError: () =>
      toast.error("Server Error 404", {
        description: "refresh the page or try again",
      }),
  });
};

export const useUpdateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, new_user_data }: userUpdateArgs) =>
      update_user_api(user_id, new_user_data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      client.invalidateQueries({ queryKey: ["users-numbers"] });
      toast.success("user updated succesfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
