import KpiUi from "@/components/KpiUi";
import { Percent } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ChartsContainer() {
  return (
    <div className=" flex flex-col  gap-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
      <div className="flex flex-wrap gap-2">
        <KpiUi
          title="Attendance Rate"
          desc="test"
          value={0}
          icon={<Percent />}
        />
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
    </div>
  );
}
