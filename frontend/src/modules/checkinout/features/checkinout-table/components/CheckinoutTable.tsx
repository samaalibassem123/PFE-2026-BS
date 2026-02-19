import { DataTable } from "@/components/ui/data-table";
import { CheckinOutColumns } from "./CheckinOutColumns";
import type { CheckInoutData } from "@/modules/checkinout/types";

const fakedata: CheckInoutData[] = [
  {
    fullname: "test",
    email: "test",
    clockin: "test",
    clockout: "test",
    weekday: "test",
  },
  {
    fullname: "test",
    email: "test",
    clockin: "test",
    clockout: "test",
    weekday: "test",
  },
  {
    fullname: "test",
    email: "test",
    clockin: "test",
    clockout: "test",
    weekday: "test",
  },
  {
    fullname: "test",
    email: "test",
    clockin: "test",
    clockout: "test",
    weekday: "test",
  },
];
export default function CheckinoutTable() {
  return <DataTable data={fakedata} columns={CheckinOutColumns} />;
}
