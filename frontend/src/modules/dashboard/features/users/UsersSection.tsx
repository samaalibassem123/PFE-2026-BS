import { DataTable } from "@/components/ui/data-table";
import AddUser from "./components/AddUser";
import { columns } from "./components/Columns";

import { useGetUsers } from "./hooks/user";
import type { UserData } from "./type";
import { UsersTableSkeleton } from "./components/UsersTableSkeleton";

export default function UsersSection() {
  const { data, isLoading } = useGetUsers();

  return (
    <div className=" space-y-2">
      <AddUser />
      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <DataTable columns={columns} data={data as UserData[]} />
      )}
    </div>
  );
}
