import type {
  AssignProjectUsers,
  AssignProjectUsersParams,
} from "@/modules/projects/types";
import api from "@/shared/api/backend";
import type { AssignProjectParams } from "../../../types";

export const get_owners_fn = async (params: AssignProjectUsersParams) => {
  const { data } = await api.get<AssignProjectUsers>(
    `/api/v1/projects/assigned/users`,
    { params },
  );
  return data;
};

export const get_project_managers_fn = async (
  params: AssignProjectUsersParams,
) => {
  const { data } = await api.get<AssignProjectUsers>(
    "/api/v1/projects/nonassigned/users",
    {
      params,
    },
  );
  return data;
};

export const assign_project_fn = async (params: AssignProjectParams) => {
  console.log(params);
  const { data } = await api.post("/api/v1/projects/assign", params);
  return data;
};

export const unassign_project_fn = async (params: AssignProjectParams) => {
  const { data } = await api.delete("/api/v1/projects/unassign", {
    data: params,
  });
  return data;
};
