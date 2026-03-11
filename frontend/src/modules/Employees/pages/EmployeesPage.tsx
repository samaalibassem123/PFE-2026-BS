import { Separator } from "@/components/ui/separator";
import { ChartsContainer } from "../features/employees-chart";
import { EmployeesTable } from "../features/Employees-table";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl">Employees Charts</h1>
        <Separator />
        <ChartsContainer />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl">Employees Table</h1>
        <Separator />
        <EmployeesTable />
      </div>
    </div>
  );
}
