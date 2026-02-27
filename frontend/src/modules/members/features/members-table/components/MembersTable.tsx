import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMembers } from "../hooks/use-members";
import { MembersColumns } from "./MemeberColumns";
{
  /*import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";*/
}
export default function MembersTable() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  // filters
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [project_name, setProjectName] = useState<string>("");
  //const [department, setDepartment] = useState<string>("");

  const { data, isPending } = useMembers({
    limit: limit,
    offset: limit * page,
    member_name: fullname,
    member_email: email,
    project_name: project_name,
    //department: department === "all" ? "" : department,
  });
  //const departments = useDepartments();
  console.log(data);
  return (
    <div>
      <DataTable
        loading={isPending}
        columns={MembersColumns}
        data={data?.data ?? []}
        total={data?.total ? data.total : 0}
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
          <Input
            placeholder="search by project Name"
            onChange={(v) => setProjectName(v.target.value)}
          />
          {/*   <Select onValueChange={(v) => setDepartment(v)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">show all departments</SelectItem>
                {isPending ? (
                  <span className="text-sm animate-pulse">
                    fetch departments
                  </span>
                ) : (
                  departments.data?.map((d) => (
                    <SelectItem value={d.name} key={d.id}>
                      {d.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>*/}
        </div>
      </DataTable>
    </div>
  );
}
