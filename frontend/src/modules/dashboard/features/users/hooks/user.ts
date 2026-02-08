import api from "@/shared/api/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserCreateSchma } from "../type";

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserCreateSchma) =>
      await api.post("/api/v1/user/", user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await api.get("/api/v1/user/"),
    staleTime: 5 * 60 * 1000,
  });
};
