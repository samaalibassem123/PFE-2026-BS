import KpiUi from "@/components/KpiUi";

import type { ChartConfig } from "@/components/ui/chart";
import { Percent } from "lucide-react";

const chartconfig = {
  att_rate: {
    label: "Attendance Rate",
    color: "var(--chart-1)",
  },
  avg_hours_perDay: {
    label: "Average Working Hours per Day",
    color: "var(--chart-3)",
  },
  avg_checkin: {
    label: "Average Check-In Time",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function RadialCharts() {
  return (
    <div className="flex gap-2">
      <KpiUi title="Attendance Rate" desc="test" value={0} icon={<Percent />} />
      <KpiUi
        title="Average Working Hours per Year"
        desc="test"
        value={0}
        icon={<Percent />}
      />
      <KpiUi
        title="Average Check-In Time "
        desc="test"
        value={"8:30"}
        icon={<Percent />}
      />
    </div>
  );
}
