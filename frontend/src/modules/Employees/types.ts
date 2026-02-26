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
