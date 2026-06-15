import KpiUi from "@/components/KpiUi";

import { useProjects } from "../../project-table/hooks/projects";
import { Briefcase } from "lucide-react";

export default function ProjectsNumbers() {
  const { data, isLoading } = useProjects({
    limit: 20,
    offset: 0,
    name: "", // project name
    year: null,
    month: null,
  });
  return (
    <div className="flex gap-5">
      <KpiUi
        title="Total Projects"
        desc="Total projects created by the admin"
        value={data?.total ?? 0}
        loading={isLoading}
        icon={<Briefcase />}
      />
      <KpiUi
        title="Latest Project"
        desc="the last project that you have been working on"
        value={data?.total ?? 0}
        loading={isLoading}
        icon={<Briefcase />}
      />
    </div>
  );
}
