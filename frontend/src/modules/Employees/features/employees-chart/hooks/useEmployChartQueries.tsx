import { useQuery } from "@tanstack/react-query"
import { employee_by_depart_fn } from "../api/employee-kpi"
import type { EmployeeByDepartmentData } from "@/modules/Employees/types"

export const useEmployeByDepartment= ()=>{
    return useQuery<EmployeeByDepartmentData[]>({
        queryKey:["employee-depart"],
        queryFn:employee_by_depart_fn
    })
}
