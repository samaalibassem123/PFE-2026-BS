import { Button } from "@/components/ui/button";
import RoleGuardComponents from "@/guards/RoleGuardComponents";
import type { ProjectData } from "@/modules/projects/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const columns: ColumnDef<ProjectData>[] = [
  {
    accessorKey: "name",
    header: "Project name",
  },
  {
    accessorKey: "identifier",
    header: "Identifier",
  },
  {
    accessorKey: "created_on",
    header: "Created On",
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <>
        <RoleGuardComponents AllowedRoles={["ADMIN"]}>
          <Button variant={"secondary"} asChild>
            <Link to={`/user/projects/${row.original.id}`}>
              Asssign to <ArrowRight />
            </Link>
          </Button>
        </RoleGuardComponents>
        <RoleGuardComponents AllowedRoles={["PROJECT_MANAGER"]}>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant={"secondary"} disabled>
                Asssign to <ArrowRight />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              This action is only enabled for ADMIN users.
            </HoverCardContent>
          </HoverCard>
        </RoleGuardComponents>
      </>
    ),
  },
];
