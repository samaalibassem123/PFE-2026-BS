import OnHoverText from "@/components/OnHoverText";
import { Badge } from "@/components/ui/badge";
import { getDayName } from "@/lib/utils";
import type { CheckInoutData } from "@/modules/checkinout/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const CheckinOutColumns: ColumnDef<CheckInoutData>[] = [
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
    accessorKey: "check_in",
    header: "clock in",
    size: 200,
    minSize: 200,
    cell: ({ row }) => {
      const date = dayjs(row.original.check_in).format("HH:MM:ss YYYY/MM/DD");
      return date ? (
        <Badge variant={"secondary"}>{date}</Badge>
      ) : (
        <Badge variant={"destructive"}>Invalid Date</Badge>
      );
    },
  },
  {
    accessorKey: "check_out",
    header: "clock out",
    minSize: 200,
    size: 200,
    cell: ({ row }) => {
      const date = dayjs(row.original.check_out).format("HH:MM:ss YYYY/MM/DD");
      return date ? (
        <Badge variant={"secondary"}>{date}</Badge>
      ) : (
        <Badge variant={"destructive"}>Invalid Date</Badge>
      );
    },
  },
  {
    accessorKey: "att_date",
    header: "Attendance Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.att_date).format("YYYY/MM/DD");
      return <Badge variant={"outline"}>{date}</Badge>;
    },
  },
  {
    accessorKey: "week_day",
    header: "Week Day",

    cell: ({ row }) => {
      const day = getDayName(row.original.week_day);
      return <Badge variant={"ghost"}>{day}</Badge>;
    },
  },
];
