import type { ProjectsData, ProjectsParams } from "@/modules/projects/types";
import { useQuery } from "@tanstack/react-query";
import { get_projects_fn } from "../api/projects";

export const useProjects = (params: ProjectsParams) => {
  return useQuery<ProjectsData>({
    queryKey: ["projects", params],
    queryFn: () => get_projects_fn(params),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
