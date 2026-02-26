import type {
  AssignProjectParams,
  AssignProjectUsers,
  AssignProjectUsersParams,
} from "@/modules/projects/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assign_project_fn,
  get_owners_fn,
  get_project_managers_fn,
  unassign_project_fn,
} from "../api/assign-projects";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/backend";

export const useAssignProject = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: AssignProjectParams) => assign_project_fn(params),
    onError: (error) => toast.error(getErrorMessage(error)),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["project-owners"] });
      client.invalidateQueries({ queryKey: ["project-pms"] });
      toast.success("Users Assigned successfully");
    },
  });
};

export const useUnassignPoject = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (params: AssignProjectParams) => unassign_project_fn(params),
    onError: (error) => toast.error(getErrorMessage(error)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["project-owners"] });
      client.invalidateQueries({ queryKey: ["project-pms"] });
      toast.success("users removed from the project successfully");
    },
  });
};

export const UseOwners = (params: AssignProjectUsersParams) => {
  return useQuery<AssignProjectUsers>({
    queryKey: ["project-owners", params],
    queryFn: () => get_owners_fn(params),
  });
};

export const UseProjectMangers = (params: AssignProjectUsersParams) => {
  return useQuery<AssignProjectUsers>({
    queryKey: ["project-pms", params],
    queryFn: () => get_project_managers_fn(params),
  });
};
