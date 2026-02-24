import type { ProjectsData, ProjectsParams } from "@/modules/projects/types";
import api from "@/shared/api/backend";

export const get_projects_fn = async (params: ProjectsParams) => {
  const { data } = await api.get<ProjectsData>("/api/v1/projects", { params });
  return data;
};
