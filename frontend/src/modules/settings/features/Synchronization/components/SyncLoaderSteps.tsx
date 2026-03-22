import { Button } from "@/components/ui/button";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { X } from "lucide-react";

const loadingStates: { text: string }[] = [
  {
    text: "Loading departments (base structure)",
  },
  {
    text: "Loading employees (linked to departments)",
  },
  {
    text: "Loading attendance records",
  },
  {
    text: "Loading projects",
  },
  {
    text: "Loading project members (linked to employees & projects)",
  },
  {
    text: "Loading attendance events",
  },
  {
    text: "Linking employee attendance events",
  },
  {
    text: "Finalizing ETL process",
  },
];

interface Props {
  loading: boolean;
  setloading:(v:boolean)=>void;
}
export default function SyncLoaderSteps({loading, setloading}:Props) {
  return (
    <div className="w-full h-[60vh] flex relative items-center justify-center">
      <MultiStepLoader  loadingStates={loadingStates} loop={false}  loading={loading} duration={2000} />
      {
        loading &&
        <Button onClick={()=>setloading(false)} variant={"secondary"}   className="  fixed  right-0 top-0 float-end m-2 z-9000 w-fit">
            <X/>
        </Button>
      }
    </div>
  );
}
