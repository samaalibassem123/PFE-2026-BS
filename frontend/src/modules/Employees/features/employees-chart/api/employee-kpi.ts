import type { EmployeeByDepartmentData } from "@/modules/Employees/types";
import api from "@/shared/api/backend"

export const employee_by_depart_fn = async ()=>{
    const { data } = await api.get<EmployeeByDepartmentData[]>("api/v1/employees/by_department");
    return data
}
