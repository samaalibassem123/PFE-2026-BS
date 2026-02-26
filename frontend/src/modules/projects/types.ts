import type { GetUserDataSchema } from "@/shared/types";

// PROJECTS TABLE
export interface ProjectData {
  id: number;
  name: string;
  identifier: string;
  created_on: Date;
  updated_on: Date;
}

export interface ProjectsData {
  total: number;
  data: ProjectData[];
}

export interface ProjectsParams {
  limit: number;
  offset: number;
  // filters
  name: string | undefined;
  year: number | null;
  month: number | null;
}

// OWNERS TABLE & Users table

export interface AssignProjectUsers {
  total: number;
  data: GetUserDataSchema[];
}

export interface AssignProjectUsersParams {
  project_id: number;
  limit: number;
  offset: number;
  // filters
  email: string | undefined;
}

// Assign Project
export interface AssignProjectParams {
  project_id: number;
  users_id: string[];
}
