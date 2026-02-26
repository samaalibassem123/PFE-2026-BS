import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EmployessColumns } from "./Columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function EmployeesTable() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  // filters
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  return (
    <div>
      <DataTable
        columns={EmployessColumns}
        data={[]}
        total={0}
        page={page}
        limit={limit}
        onPagechange={setPage}
        onLimitChange={setLimit}
      >
        <div className="flex items-center gap-5 p-3">
          <Input
            placeholder="search by name"
            onChange={(v) => setFullname(v.target.value)}
          />
          <Input
            placeholder="search by email"
            onChange={(v) => setEmail(v.target.value)}
          />
          <Select onValueChange={(v) => setDepartment(v)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">test</SelectItem>
                <SelectItem value="dark">test</SelectItem>
                <SelectItem value="system">test</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DataTable>
    </div>
  );
}
