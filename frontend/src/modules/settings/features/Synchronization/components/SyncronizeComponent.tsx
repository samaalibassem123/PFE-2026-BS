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

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";
import { useSyncronization } from "../hooks/useSyncronization";

export default function SyncronizeComponent() {
const {steps, loading,Syncronize} = useSyncronization()

const [progress, setProgress] = useState(10);



useEffect(()=>{
  console.log(steps)
},[steps])

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

      <CardFooter className=" justify-between gap-3">
        <div className=" flex-1 gap-2 flex-col">
          <Shimmer>department....</Shimmer>
          <Progress value={progress} />
        </div>
        <Button

          size="lg"
          variant={loading ? "secondary" : "default"}
          disabled={loading}
          onClick={() => Syncronize()}
        >
          <RefreshCcw className={cn(loading && " animate-spin")} />
          Run Synchronization
        </Button>
      </CardFooter>
    </Card>
  </>
);
}
