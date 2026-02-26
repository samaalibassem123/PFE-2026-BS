import {
  type DepartmentData,
  type GetEmployeesData,
  type GetEmployeesParams,
} from "@/modules/Employees/types";
import api from "@/shared/api/backend";

export const get_employee_fn = async (params: GetEmployeesParams) => {
  const { data } = await api.get<GetEmployeesData>("/api/v1/employees", {
    params,
  });
  return data;
};
export const get_department_fn = async () => {
  const { data } = await api.get<DepartmentData[]>(
    "/api/v1/employees/departments",
  );
  return data;
};
