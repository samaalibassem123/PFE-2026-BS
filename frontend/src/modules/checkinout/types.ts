import type { EmployeeData } from "../Employees/types";

export interface CheckInoutData {
  check_in: Date;
  check_out: Date;
  att_date: Date;
  week_day: number;
  employee: EmployeeData;
}

export interface GetCheckinoutData {
  total: number;
  data: CheckInoutData[];
}

export interface GetChekinoutParams {
  limit: number;
  offset: number;
  //filters
  fullname: string;
  email: string;
  start_date: string | undefined;
  end_date: string | undefined;
  department: string | undefined;
}
