import { ConstellationBackground } from "@/components/ui/constellation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

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
    <div className="w-full h-svh flex relative items-center justify-center">
      <MultiStepLoader
        loadingStates={loadingStates}
        loop={false}
        loading={loading}
        duration={2000}
      />
      <ConstellationBackground />
    </div>
  );
}
