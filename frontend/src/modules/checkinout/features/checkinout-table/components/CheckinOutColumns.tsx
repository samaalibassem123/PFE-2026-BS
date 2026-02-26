import { getDayName } from "@/lib/utils";
import type { CheckInoutData } from "@/modules/checkinout/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const CheckinOutColumns: ColumnDef<CheckInoutData>[] = [
  {
    accessorKey: "employee.full_name",
    header: "employee_fullname",
    cell: ({ row }) => (
      <span className=" truncate w-[130px] ">
        {row.original.employee.full_name}
      </span>
    ),
  },
  {
    accessorKey: "employee.email",
    header: "employee_email",
    cell: ({ row }) => (
      <span className=" truncate w-[130px] ">
        {row.original.employee.email}
      </span>
    ),
  },
  {
    accessorKey: "check_in",
    header: "clock in",
    cell: ({ row }) => {
      const date = dayjs(row.original.check_in).format("HH:MM:ss YYYY/MM/DD");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "check_out",
    header: "clock out",
    cell: ({ row }) => {
      const date = dayjs(row.original.check_out).format("HH:MM:ss YYYY/MM/DD");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "att_date",
    header: "Attendance Date",
    cell: ({ row }) => {
      const date = dayjs(row.original.att_date).format("HH:MM:ss YYYY/MM/DD");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "week_day",
    header: "Week Day",

    cell: ({ row }) => {
      const day = getDayName(row.original.week_day);
      return <span>{day}</span>;
    },
  },
];
