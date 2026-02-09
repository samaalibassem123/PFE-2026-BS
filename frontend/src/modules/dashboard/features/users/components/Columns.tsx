import type { ColumnDef } from "@tanstack/react-table";
import type { UserData } from "../type";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Ellipsis } from "lucide-react";
import dayjs from "dayjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUser from "./DeleteUser";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "created_at",
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
    accessorKey: "username",
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="w-full justify-between"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <DeleteUser user_id={row.original.id as string} />
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
