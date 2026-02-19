import { ChartArea } from "@/components/ChartArea";
import RadialCharts from "../features/checkinout-charts/components/RadialCharts";
import { CheckinoutTable } from "../features/checkinout-table";

export default function CheckinoutPage() {
  return (
    <div className=" space-y-4">
      <RadialCharts />
      <ChartArea />
      <CheckinoutTable />
    </div>
  );
}
