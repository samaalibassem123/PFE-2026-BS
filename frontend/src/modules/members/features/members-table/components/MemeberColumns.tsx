import OnHoverText from "@/components/OnHoverText";
import type { MembersData } from "@/modules/members/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export const MembersColumns: ColumnDef<MembersData>[] = [
  {
    accessorKey: "employee.email",
    header: "Employee Email",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <OnHoverText msg={row.original.employee.email}>
          <p
            onClick={() =>
              navigate(
                `/user/members-att?member_email=${row.original.employee.email}&member_name=${row.original.employee.full_name}`,
              )
            }
            className=" cursor-pointer  truncate w-[130px] "
          >
            {row.original.employee.email}
          </p>
        </OnHoverText>
      );
    },
  },
  {
    accessorKey: "employee.full_name",
    header: "Employee Name",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <OnHoverText msg={row.original.employee.full_name}>
          <p
            className=" cursor-pointer truncate w-[130px] "
            onClick={() =>
              navigate(
                `/user/members-att?member_email=${row.original.employee.email}&member_name=${row.original.employee.full_name}`,
              )
            }
          >
            {row.original.employee.full_name}
          </p>
        </OnHoverText>
      );
    },
  },
  {
    accessorKey: "project.name",
    header: "Project Name",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.project.name}>
        <p className=" truncate w-[130px] ">{row.original.project.name}</p>
      </OnHoverText>
    ),
  },
];
