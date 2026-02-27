import { useQuery } from "@tanstack/react-query";
import {
  get_emp_leave_events_fn,
  get_emp_leave_fn,
} from "../api/employee-leave-api";
import type {
  EventData,
  GetEmployeeLeaveParams,
  GetEmployeeLeaveResponse,
} from "@/modules/Employees-leave/types";

export const useEmployeesLeave = (params: GetEmployeeLeaveParams) => {
  return useQuery<GetEmployeeLeaveResponse>({
    queryKey: ["emp-leave", params],
    queryFn: () => get_emp_leave_fn(params),
  });
};

export const useEmployeesLeaveEvents = () => {
  return useQuery<EventData[]>({
    queryKey: ["emp-leave-events"],
    queryFn: get_emp_leave_events_fn,
    staleTime: 50 * 60 * 1000,
  });
};
