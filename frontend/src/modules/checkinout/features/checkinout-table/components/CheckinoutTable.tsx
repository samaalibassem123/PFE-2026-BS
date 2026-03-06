import { DataTable } from "@/components/ui/data-table";
import { CheckinOutColumns } from "./CheckinOutColumns";

import { useState } from "react";
import { useCheckinout } from "../hooks/usecheckinout";
import { Input } from "@/components/ui/input";
import { CalendarRange } from "@/components/CalendarRange";

export default function CheckinoutTable() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  // filters
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [start_date, setStartdate] = useState<string | undefined>(undefined);
  const [end_date, setEndDate] = useState<string | undefined>(undefined);

  const { data, isPending } = useCheckinout({
    limit: limit,
    offset: page * limit,
    fullname: fullname,
    email: email,
    start_date: start_date,
    end_date: end_date,
  });

  return (
    <DataTable
      loading={isPending}
      data={data?.data ?? []}
      columns={CheckinOutColumns}
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
        <CalendarRange
          onDateChange={(start, end) => {
            setStartdate(start);
            setEndDate(end);
          }}
        />
      </div>
    </DataTable>
  );
}
