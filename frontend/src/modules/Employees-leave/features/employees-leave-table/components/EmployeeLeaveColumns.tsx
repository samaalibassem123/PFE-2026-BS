import OnHoverText from "@/components/OnHoverText";
import { Badge } from "@/components/ui/badge";
import { getDayName } from "@/lib/utils";
import type { EmployeeLeaveData } from "@/modules/Employees-leave/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const EmployeeLeaveColumns: ColumnDef<EmployeeLeaveData>[] = [
  {
    accessorKey: "employee.full_name",
    header: "employee_fullname",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.employee.full_name}>
        <p className=" truncate w-[130px] ">
          {row.original.employee.full_name}
        </p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "employee.email",
    header: "employee_email",
    cell: ({ row }) => (
      <OnHoverText msg={row.original.employee.email}>
        <p className=" truncate w-[130px] ">{row.original.employee.email}</p>
      </OnHoverText>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    size: 200,
    minSize: 200,
    cell: ({ row }) => {
      const date = dayjs(row.original.start_date).format("HH:MM:ss YYYY/MM/DD");
      return date !== "Invalid Date" ? (
        <Badge variant={"secondary"}>{date}</Badge>
      ) : (
        <Badge variant={"destructive"}>Invalid Date</Badge>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    minSize: 200,
    size: 200,
    cell: ({ row }) => {
      const date = dayjs(row.original.end_date).format("HH:MM:ss YYYY/MM/DD");
      return date !== "Invalid Date" ? (
        <Badge variant={"secondary"}>{date}</Badge>
      ) : (
        <Badge variant={"destructive"}>Invalid Date</Badge>
      );
    },
  },
  {
    accessorKey: "apply_time",
    header: "Apply Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.apply_time).format("YYYY/MM/DD HH:MM:ss");
      return <Badge variant={"outline"}>{date}</Badge>;
    },
  },
  {
    accessorKey: "event.name",
    header: "Status",

    cell: ({ row }) => {
      return <Badge variant={"ghost"}>{row.original.event.name}</Badge>;
    },
  },
];
