import { useQuery } from "@tanstack/react-query";
import { get_department_fn, get_employee_fn } from "../api/emlpoyees-table";
import type {
  DepartmentData,
  GetEmployeesData,
  GetEmployeesParams,
} from "@/modules/Employees/types";

export const useEmployees = (params: GetEmployeesParams) => {
  return useQuery<GetEmployeesData>({
    queryKey: ["employees", params],
    queryFn: () => get_employee_fn(params),
  });
};

export const useDepartments = () => {
  return useQuery<DepartmentData[]>({
    queryKey: ["departments"],
    queryFn: get_department_fn,
    staleTime: 50 * 60 * 1000,
  });
};
