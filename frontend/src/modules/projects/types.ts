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
