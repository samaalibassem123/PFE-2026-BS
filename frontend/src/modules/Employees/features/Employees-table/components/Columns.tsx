import type { EmployeeData } from "@/modules/Employees/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const EmployessColumns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "email",
    header: "Employee Email",
    cell: ({ row }) => (
      <span className=" truncate w-[130px] ">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Employee Name",
    cell: ({ row }) => (
      <span className=" truncate w-[130px] ">{row.original.full_name}</span>
    ),
  },
  {
    accessorKey: "department.name",
    header: "Department",
    cell: ({ row }) => (
      <span className=" truncate w-[130px] ">
        {row.original.department.name}
      </span>
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
