import type { AvailableRoles } from "@/utils/Roles";
import { useState } from "react";
import { useGetUsers } from "../hooks/user";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import { columns } from "./Columns";
import { Input } from "@/components/ui/input";

export default function UsersTable() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<AvailableRoles | "ALL">("ALL");

  const { data, isLoading } = useGetUsers({
    limit: limit,
    offset: page * limit,
    role: role === "ALL" ? "" : role,
    email: email,
  });
  return (
    <DataTable
      loading={isLoading}
      page={page}
      limit={limit}
      total={data?.total ? data.total : 0}
      columns={columns}
      onPagechange={setPage}
      onLimitChange={setLimit}
      data={data ? data?.data : []}
    >
      {/**FILTERS */}
      <div className="p-4 flex gap-2">
        <Input
          placeholder="search by email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select onValueChange={(value) => setRole(value as AvailableRoles)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter By Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Show All</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="PROJECT_MANAGER">PROJECT_MANAGER</SelectItem>
              <SelectItem value="RH">RH</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </DataTable>
  );
}
