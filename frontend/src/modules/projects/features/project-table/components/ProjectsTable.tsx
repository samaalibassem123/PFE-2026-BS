import { useState } from "react";
import { useProjects } from "../hooks/projects";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ProjectsTable() {
  const [limit, setLimit] = useState<number>(30);
  const [page, setPage] = useState<number>(0);
  //filters
  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  const { data, isLoading } = useProjects({
    limit: limit,
    offset: limit * page,
    name: name, // project name
    year: year,
    month: month,
  });

  return (
    <div>
      <DataTable
        total={data?.total ?? 0}
        limit={limit}
        onLimitChange={setLimit}
        page={page}
        onPagechange={setPage}
        loading={isLoading}
        columns={columns}
        data={data?.data ?? []}
      >
        {/** FILTERS */}
        <div className="p-4 flex gap-2">
          <Input
            placeholder="search by project name..."
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            onValueChange={(value) =>
              value === "all" ? setYear(null) : setYear(Number(value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All years</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              value === "all" ? setMonth(null) : setMonth(Number(value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All months</SelectItem>
                {[...Array(12).keys()].map((_, i) => (
                  <SelectItem key={i} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DataTable>
    </div>
  );
}
