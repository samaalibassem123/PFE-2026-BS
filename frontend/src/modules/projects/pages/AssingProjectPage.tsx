import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { UsersTable } from "../features/assign-projects";
import OwnersTable from "../features/assign-projects/components/OwnersTable";

export default function AssingProjectPage() {
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const project_name = searchParams.get("name");
  const project_created_on = searchParams.get("created_on");

  return (
    <main className="space-y-8">
      <div>
        <Button variant={"secondary"} className="mb-3" asChild>
          <Link to={"/user/projects"}>
            <ArrowLeft /> Got back to projects
          </Link>
        </Button>
        <h1 className=" text-lg ml-2">{project_name}</h1>
        <span className=" ml-2 text-xs text-foreground/70">
          created_on : {project_created_on}
        </span>{" "}
        <Separator className="mt-2" />
      </div>

      <div className=" space-y-3">
        <h1>Project Owners</h1>
        <Separator />
        <OwnersTable project_id={Number(id)} />
      </div>

      <div className="space-y-3">
        <h1>Project Managers</h1>
        <Separator />
        <UsersTable project_id={Number(id)} />
      </div>
    </main>
  );
}
