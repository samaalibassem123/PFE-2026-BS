import type {
  EmployeeLeaveData,
  GetEmployeeLeaveResponse,
} from "../Employees-leave/types";

export interface MembersAttData extends EmployeeLeaveData {}

export interface GetMembersAttResponse extends GetEmployeeLeaveResponse {}

export interface GetMembersAttParams {
  limit: number;
  offset: number;
  email: string;
  member_name: string;
  project_name: string;
  start_date: number | null;
  end_date: number | null;
  event: string;
}
