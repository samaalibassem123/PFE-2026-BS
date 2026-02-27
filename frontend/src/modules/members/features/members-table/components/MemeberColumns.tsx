import OnHoverText from "@/components/OnHoverText";
import type { MembersData } from "@/modules/members/types";
import type { ColumnDef } from "@tanstack/react-table";

export const MembersColumns: ColumnDef<MembersData>[] = [
  {
    accessorKey: "project.name",
    header: "Project Name",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.project.name}>
        <p className=" truncate w-[130px] ">{row.original.project.name}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "employee.email",
    header: "Employee Email",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.employee.email}>
        <p className=" truncate w-[130px] ">{row.original.employee.email}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "employee.full_name",
    header: "Employee Name",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.employee.full_name}>
        <p className=" truncate w-[130px] ">
          {row.original.employee.full_name}
        </p>
      </OnHoverText>
    ),
  },
];
