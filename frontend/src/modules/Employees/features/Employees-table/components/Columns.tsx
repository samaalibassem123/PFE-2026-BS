import OnHoverText from "@/components/OnHoverText";
import { Badge } from "@/components/ui/badge";
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
        <Badge variant={"default"} className=" truncate max-w-[130px] ">
          {row.original.department.name}
        </Badge>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "hire_date",
    header: "Hire Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.hire_date).format("YYYY/MM/DD ");
      return <Badge variant={"secondary"}>{date}</Badge>;
    },
  },
];
