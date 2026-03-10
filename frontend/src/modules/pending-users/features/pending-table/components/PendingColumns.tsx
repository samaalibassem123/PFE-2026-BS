import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";


import { Badge } from "@/components/ui/badge";
import type { PendingUserData } from "@/modules/pending-users/types";
import ApproveDialog from "./ApproveDialog";
import DeclineDialog from "./DeclineDialog";


export const PendingColumns: ColumnDef<PendingUserData>[] = [
  {
    accessorKey: "created_at",
    size: 200,

    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="w-full justify-between"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created_at{" "}
        {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    ),
    cell: ({ getValue }) => {
      const date = getValue();
      const transformed_date = dayjs(date as string).format(
        "YYYY-MM-DD HH:MM:ss ",
      );
      return <>{transformed_date}</>;
    },
  },
  {
    accessorKey: "user.username",
    size: 200,

    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="w-full justify-between"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    ),
  },
  {
    accessorKey: "user.email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "user.role",
    size: 200,

    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="w-full justify-between"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    ),
    cell: ({ row }) =>
      row.original.user.role === "ADMIN" ? (
        <Badge variant={"destructive"}>ADMIN</Badge>
      ) : row.original.user.role === "RH" ? (
        <Badge variant={"secondary"}>RH</Badge>
      ) : (
        <Badge variant={"outline"}>Project Manager</Badge>
      ),
  },
  {
    accessorKey: "status",
    size: 100,
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="w-full justify-between"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.status === "PENDING" ? (
          <Badge variant={"pending"}>Pending</Badge>
        ) : row.original.status === "APPROVED" ? (
          <Badge variant={"approved"}>Approved</Badge>
        ) : (
          <Badge variant={"destructive"}>Declined</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    size: 50,
    header: "Actions",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.status === "PENDING" ?(<div className="w-full flex items-center justify-center  gap-2">
            <ApproveDialog user_data={row.original.user}/>
            <DeclineDialog user_data={row.original.user}/>
        </div>):<Badge variant={"ghost"}>--</Badge>}
      </div>
    ),
  },
];
