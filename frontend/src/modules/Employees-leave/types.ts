import type { EmployeeData } from "../Employees/types";

export interface EventData {
  id: number;
  name: string;
}

export interface EmployeeLeaveData {
  id: number;
  apply_time: string;
  start_date: string;
  end_date: string;
  employee: EmployeeData;
  event: EventData;
}

export interface GetEmployeeLeaveResponse {
  total: number;
  data: EmployeeLeaveData[];
}
export interface GetEmployeeLeaveParams {
  limit: number;
  offset: number;
  fullname: string;
  email: string;
  event: string;
}
