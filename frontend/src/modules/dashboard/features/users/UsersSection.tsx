import { DataTable } from "@/components/ui/data-table";
import AddUser from "./components/AddUser";
import { columns } from "./components/Columns";

import { useGetUsers } from "./hooks/user";
import type { UserData } from "./type";
import { UsersTableSkeleton } from "./components/UsersTableSkeleton";

export default function UsersSection() {
  const { data, isLoading } = useGetUsers();

  return (
    <div className=" space-y-5">
      <div className=" w-full flex items-center justify-end">
        <AddUser />
      </div>

      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <DataTable columns={columns} data={data as UserData[]} />
      )}
    </div>
  );
}
