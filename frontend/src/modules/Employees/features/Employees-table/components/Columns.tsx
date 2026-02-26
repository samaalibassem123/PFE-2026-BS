import type { EmployeeData } from "@/modules/Employees/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const EmployessColumns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "email",
    header: "Employee Email",
    cell: ({ row }) => (
      <p className=" truncate w-[130px] ">{row.original.email}</p>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Employee Name",
    cell: ({ row }) => (
      <p className=" truncate w-[130px] ">{row.original.full_name}</p>
    ),
  },
  {
    accessorKey: "department.name",
    header: "Department",
    cell: ({ row }) => (
      <p className=" truncate w-[130px] ">{row.original.department.name}</p>
    ),
  },
  {
    accessorKey: "hire_date",
    header: "Hire Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.hire_date).format("YYYY/MM/DD HH:MM:ss");
      return <span>{date}</span>;
    },
  },
];
