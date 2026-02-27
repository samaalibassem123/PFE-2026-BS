import { DataTable } from "@/components/ui/data-table";

import { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMembersAtt } from "../hooks/user-members-att";
import { useEmployeesLeaveEvents } from "@/modules/Employees-leave/features/employees-leave-table/hooks/use-employee-leave";
import { MembersAttColumns } from "./MembersAttColumns";

export default function MembersAttTable() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  // filters
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [start_date, setStartdate] = useState<number | null>(null);
  const [end_date, setEndDate] = useState<number | null>(null);

  const { data, isPending } = useMembersAtt({
    limit: limit,
    offset: page * limit,
    member_name: fullname,
    email: email,
    event: event == "all" ? "" : event,
    start_date: start_date,
    end_date: end_date,
    project_name: "",
  });

  const events = useEmployeesLeaveEvents();

  return (
    <DataTable
      loading={isPending}
      data={data?.data ?? []}
      columns={MembersAttColumns}
      limit={limit}
      page={page}
      total={data?.total ?? 0}
      onLimitChange={setLimit}
      onPagechange={setPage}
    >
      <div className="p-4 flex gap-2">
        <Input
          placeholder="search by employee name"
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          placeholder="search by email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="start_date"
          type="number"
          onChange={(e) => setStartdate(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="end_date"
          onChange={(e) => setEndDate(Number(e.target.value))}
        />
        <Select onValueChange={(v) => setEvent(v)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">show all events</SelectItem>
              {events.isPending ? (
                <span className="text-sm animate-pulse">fetch events</span>
              ) : (
                events.data?.map((e) => (
                  <SelectItem value={e.name} key={e.id}>
                    {e.name}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </DataTable>
  );
}
