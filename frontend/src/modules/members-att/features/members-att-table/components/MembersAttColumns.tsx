import { EmployeeLeaveColumns } from "@/modules/Employees-leave/features/employees-leave-table/components/EmployeeLeaveColumns";
import type { MembersAttData } from "@/modules/members-att/types";
import type { ColumnDef } from "@tanstack/react-table";

export const MembersAttColumns: ColumnDef<MembersAttData>[] = [
  ...EmployeeLeaveColumns,
];
