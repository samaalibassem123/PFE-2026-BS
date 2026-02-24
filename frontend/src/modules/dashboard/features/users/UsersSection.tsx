import AddUser from "./components/AddUser";

import { Separator } from "@/components/ui/separator";
import UsersTable from "./components/UsersTable";

export default function UsersSection() {
  return (
    <div className=" space-y-5">
      <div className="text-foreground/50">Users Table</div>
      <Separator />
      <div className=" w-full flex items-center justify-end">
        <AddUser />
      </div>
      <UsersTable />
    </div>
  );
}
