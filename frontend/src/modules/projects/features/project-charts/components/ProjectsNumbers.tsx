import KpiUi from "@/components/KpiUi";
import React from "react";

export default function ProjectsNumbers() {
  return (
    <div>
      <KpiUi
        title="Total Projects"
        desc="Total projects created by the admin"
        value={0}
        loading={false}
        icon={<></>}
      />
    </div>
  );
}
