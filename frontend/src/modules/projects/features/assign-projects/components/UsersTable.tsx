import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { columns } from "./Columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAssignProject, UseProjectMangers } from "../hooks/assign-projects";
import type { GetUserDataSchema } from "@/shared/types";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  project_id: number;
}

export default function UsersTable({ project_id }: Props) {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<GetUserDataSchema[]>([]);

  //filters
  const [email, setEmail] = useState<string>("");
  const { data, isLoading } = UseProjectMangers({
    limit: limit,
    offset: limit * page,
    email: email,
    project_id: project_id,
  });

  const { mutate, isPending } = useAssignProject();

  const handleAssignProject = () => {
    if (selectedRows) {
      const users_id: string[] = selectedRows.map((r) => r.id as string);
      mutate({ users_id: users_id, project_id: project_id });
    }
  };

  return (
    <div>
      <DataTable
        loading={isLoading}
        columns={columns}
        data={data ? data.data : []}
        limit={limit}
        onLimitChange={setLimit}
        onPagechange={setPage}
        onSelectChange={setSelectedRows}
        page={page}
        total={data ? data.total : 0}
      >
        <div className="w-full p-2 flex items-center justify-between">
          <Input
            placeholder="search by email..."
            className="w-sm"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            disabled={selectedRows.length <= 0 || isPending}
            onClick={handleAssignProject}
          >
            <PlusCircle /> Assign to Project {isPending && <Spinner />}
          </Button>
        </div>
      </DataTable>
    </div>
  );
}
