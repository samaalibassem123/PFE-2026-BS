import { Separator } from "@/components/ui/separator";
import { ProjectsNumbers } from "../features/project-charts";
import { ProjectsTable } from "../features/project-table";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects Chart</h1>
      <ProjectsNumbers />
      <Separator className="my-4" />
      <h1 className="text-2xl font-bold mb-4">Projects Table</h1>
      <ProjectsTable />
    </div>
  );
}
