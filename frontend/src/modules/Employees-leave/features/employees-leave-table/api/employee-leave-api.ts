import {
  type EventData,
  type GetEmployeeLeaveParams,
  type GetEmployeeLeaveResponse,
} from "@/modules/Employees-leave/types";
import api from "@/shared/api/backend";

export const get_emp_leave_fn = async (params: GetEmployeeLeaveParams) => {
  const { data } = await api.get<GetEmployeeLeaveResponse>(
    "/api/v1/emp_leave/",
    { params },
  );
  return data;
};

export const get_emp_leave_events_fn = async () => {
  const { data } = await api.get<EventData[]>("/api/v1/emp_leave/events");
  return data;
};
