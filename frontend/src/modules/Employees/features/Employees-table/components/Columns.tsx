import OnHoverText from "@/components/OnHoverText";
import type { EmployeeData } from "@/modules/Employees/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const EmployessColumns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "email",
    header: "Employee Email",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.email}>
        <p className=" truncate w-[130px] ">{row.original.email}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Employee Name",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.full_name}>
        <p className=" truncate w-[130px] ">{row.original.full_name}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "department.name",
    header: "Department",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.department.name}>
        <p className=" truncate w-[130px] ">{row.original.department.name}</p>
      </OnHoverText>
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
