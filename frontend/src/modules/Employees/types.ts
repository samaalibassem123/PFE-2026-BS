export interface DepartmentData {
  id: number;
  name: string;
}

export interface EmployeeData {
  id: number;
  full_name: string;
  email: string;
  hire_date: Date;
  department: DepartmentData;
}

export interface GetEmployeesParams {
  limit: number;
  offset: number;
  fullname: string;
  email: string;
  department: string;
}
export interface GetEmployeesData {
  total: number;
  data: EmployeeData[];
}
