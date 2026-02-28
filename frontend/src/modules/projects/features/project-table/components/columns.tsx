import { Button } from "@/components/ui/button";
import RoleGuardComponents from "@/guards/RoleGuardComponents";
import type { ProjectData } from "@/modules/projects/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import dayjs from "dayjs";
import OnHoverText from "@/components/OnHoverText";

export const columns: ColumnDef<ProjectData>[] = [
  {
    accessorKey: "name",
    header: "Project name",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <OnHoverText msg={row.original.name}>
          <p
            onClick={() =>
              navigate(`/user/members?project_name=${row.original.name}`)
            }
            className=" truncate w-[130px] cursor-pointer"
          >
            {row.original.name}
          </p>
        </OnHoverText>
      );
    },
  },
  {
    accessorKey: "identifier",
    header: "Identifier",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.identifier}>
        <p className=" truncate w-[130px] ">{row.original.identifier}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    cell: ({ row }) => {
      const transformed_date = dayjs(row.original.created_on).format(
        "YYYY-MM-DD HH:MM:ss",
      );
      return <span>{transformed_date}</span>;
    },
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
    cell: ({ row }) => {
      const transformed_date = dayjs(row.original.updated_on).format(
        "YYYY-MM-DD HH:MM:ss",
      );
      return <span>{transformed_date}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "actions",
    size: 70,
    cell: ({ row }) => (
      <div className="">
        <RoleGuardComponents AllowedRoles={["ADMIN"]}>
          <Button
            variant={"secondary"}
            className="w-full hover:tracking-wide"
            asChild
          >
            <Link
              to={`/user/projects/${row.original.id}?name=${row.original.name}&created_on=${dayjs(
                row.original.created_on,
              ).format("YYYY-MM-DD HH:MM:ss")}`}
            >
              Assign to <ArrowRight />
            </Link>
          </Button>
        </RoleGuardComponents>
        <RoleGuardComponents AllowedRoles={["PROJECT_MANAGER"]}>
          <HoverCard>
            <HoverCardTrigger>
              <Button
                variant={"secondary"}
                className="w-full hover:tracking-wide"
                disabled
              >
                Assign to <ArrowRight />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              This action is only enabled for ADMIN users.
            </HoverCardContent>
          </HoverCard>
        </RoleGuardComponents>
      </div>
    ),
  },
];
