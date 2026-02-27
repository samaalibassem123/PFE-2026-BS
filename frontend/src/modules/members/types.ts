import type { EmployeeData } from "@/modules/Employees/types";
import type { ProjectData } from "@/modules/projects/types";

export interface MembersData {
  id: number;
  project: ProjectData;
  employee: EmployeeData;
}

export interface GetMembersResponse {
  total: number;
  data: MembersData[];
}

export interface GetMembersParams {
  limit: number;
  offset: number;
  member_name: string;
  member_email: string;
  project_name: string;
}
