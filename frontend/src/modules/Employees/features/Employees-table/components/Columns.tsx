import type { EmployeeData } from "@/modules/Employees/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const EmployessColumns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "email",
    header: "Employee Email",
  },
  {
    accessorKey: "full_name",
    header: "Employee Name",
  },
  {
    accessorKey: "department.name",
    header: "Department",
  },
  {
    accessorKey: "hire_date",
    header: "Hire Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.hire_date).format("YY/MM/DD HH:MM:ss");
      return <span>{date}</span>;
    },
  },
];
