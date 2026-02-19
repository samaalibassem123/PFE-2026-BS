import type { CheckInoutData } from "@/modules/checkinout/types";
import type { ColumnDef } from "@tanstack/react-table";

export const CheckinOutColumns: ColumnDef<CheckInoutData>[] = [
  { accessorKey: "fullname", header: "employee_fullname" },
  { accessorKey: "email", header: "employee_email" },
  { accessorKey: "clockin", header: "clock in" },
  { accessorKey: "clockout", header: "clock out" },
  { accessorKey: "weekday", header: "Week Day" },
];
