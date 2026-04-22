import { Separator } from "@/components/ui/separator";
import { CheckinoutTable } from "../features/checkinout-table";
//import { CheckinoutCharts } from "../features/checkinout-charts";

export default function CheckinoutPage() {
  return (
    <div className=" space-y-5">
      <div className="space-y-3">
        <h1 className="text-lg">Employees Check In-Out Table</h1>
        <Separator />
        <CheckinoutTable />
      </div>
    </div>
  );
}
