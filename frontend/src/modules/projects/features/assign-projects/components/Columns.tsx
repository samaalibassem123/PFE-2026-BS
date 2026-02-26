import { Badge } from "@/components/ui/badge";

import { Checkbox } from "@/components/ui/checkbox";
import type { GetUserDataSchema } from "@/shared/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<GetUserDataSchema>[] = [
  {
    accessorKey: "select",
    size: 20,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={row.original.id}
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: "created On",
    cell: ({ row }) => {
      const date = dayjs(row.original.created_at).format("YYYY-MM-DD HH:MM:ss");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "username",
    header: "name",
    cell: ({ row }) => (
      <span className=" truncate max-w-full ">{row.original.username}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className=" truncate max-w-full ">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) =>
      row.original.role === "ADMIN" ? (
        <Badge variant={"destructive"}>ADMIN</Badge>
      ) : row.original.role === "RH" ? (
        <Badge variant={"secondary"}>RH</Badge>
      ) : (
        <Badge variant={"outline"}>Project Manager</Badge>
      ),
  },
];
