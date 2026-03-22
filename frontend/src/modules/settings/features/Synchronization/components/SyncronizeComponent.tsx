import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";
import SyncLoaderSteps from "./SyncLoaderSteps";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Shimmer } from "@/components/ai-elements/shimmer";
export default function SyncronizeComponent() {
const[loading, setloading] = useState<boolean>(false)
const [progress, setProgress] = useState(10);

const handleSync =  ()=> {
    setloading(true)
}

useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

return (
  <>
    <Card className=" w-full ">
      <CardHeader>
        <CardTitle className=" text-2xl">
          System Data Synchronization (Biotime & EasyProject)
        </CardTitle>
        <CardDescription className="">
          Synchronize and update all system data using ETL pipelines from
          Biotime and EasyProject.
        </CardDescription>
      </CardHeader>
      <CardContent className=" font-extralight text-[13px]">
        <p className="mb-4">
          <span className="font-bold ">Biotime : </span>
          provides workforce and attendance data, including employee check-ins,
          check-outs, working hours, shifts, and leave records. It ensures
          accurate tracking of employee presence and time-related information.
        </p>

        <p className="mb-4">
          <span className="font-bold">EasyProject : </span>
          contains project management data such as projects, tasks, assignments,
          users, budgets, and progress tracking. It helps manage operational
          workflows and project execution details.
        </p>

        <p>
          By combining both sources, this synchronization ensures that employee
          activity and project information stay aligned and consistently updated
          in your main database.
        </p>

      </CardContent>

      <CardFooter className=" justify-between">
        <div className="w-full space-y-2 ">
            <Shimmer>Loading departments....</Shimmer>

             <Progress value={progress} className="w-[60%]" />
        </div>


        <Button size="lg" variant={"confirme"} onClick={() => handleSync()}>
          <RefreshCcw />
          Run Synchronization
        </Button>
      </CardFooter>
    </Card>
    <SyncLoaderSteps loading={loading} setloading={setloading} />
  </>
);
}
