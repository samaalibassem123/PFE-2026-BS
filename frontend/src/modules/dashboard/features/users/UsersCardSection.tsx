import { Users, Briefcase, Folder, User, ChartArea } from "lucide-react";

import { useGetUsersNumbers } from "./hooks/users-card-info";
import { toast } from "sonner";
import { useEffect } from "react";
import { getErrorMessage } from "@/shared/api/backend";
import { RadialChart } from "../../../../components/RadialChart";
import { type ChartConfig } from "../../../../components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import KpiUi from "@/components/KpiUi";
const chartconfig = {
  total_admins: {
    label: "Admins",
    color: "var(--chart-1)",
  },
  total_rh: {
    label: "HR",
    color: "var(--chart-3)",
  },
  total_projectM: {
    label: "Project Managers",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function UsersCardSection() {
  const { data, isError, isPending, error } = useGetUsersNumbers();

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  }, [isError, error]);

  return (
    <div className="w-full space-y-2">
      <div className="text-foreground/50">Users informations</div>
      <Separator />
      <Tabs defaultValue="cards" className="w-full">
        <TabsList>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="chart">
            <ChartArea />
            Charts
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="cards"
          className="flex gap-3 w-full justify-between flex-wrap"
        >
          <KpiUi
            title="Total Users"
            desc="Total users created by the admin"
            value={data?.total_users ?? 0}
            loading={isPending}
            icon={<Users />}
          />
          <KpiUi
            title="Total Admins"
            desc="Total admins accounts"
            value={data?.total_admins ?? 0}
            icon={<User />}
            loading={isPending}
          />
          <KpiUi
            title="Total Project Managers"
            desc="Total Project Managers accounts"
            value={data?.total_projectM ?? 0}
            icon={<Folder />}
            loading={isPending}
          />
          <KpiUi
            title="Total RH"
            desc="Total Humans ressource accounts"
            value={data?.total_rh ?? 0}
            icon={<Briefcase />}
            loading={isPending}
          />{" "}
        </TabsContent>
        <TabsContent
          value="chart"
          className="flex flex-row gap-2 flex-wrap xl:flex-nowrap"
        >
          <RadialChart
            chartConfig={chartconfig}
            chartData={data ? [data] : []}
            value={data?.total_users}
            value_label="Total users"
            cardFooterTitle="Users by Role"
            cardFooterDesc="radial charts that show the number of users by role"
          />
          <RadialChart
            chartConfig={chartconfig}
            chartData={data ? [{ total_admins: data.total_admins }] : []}
            value={data?.total_admins}
            value_label="Total admins"
            cardFooterTitle="Admin Users "
            cardFooterDesc="radial charts that show the number of Admins on users"
          />
          <RadialChart
            chartConfig={chartconfig}
            chartData={data ? [{ total_rh: data.total_rh }] : []}
            value={data?.total_rh}
            value_label="Total RH"
            cardFooterTitle="RH Users"
            cardFooterDesc="radial charts that show the number of RH on users"
          />
          <RadialChart
            chartConfig={chartconfig}
            chartData={data ? [{ total_projectM: data.total_projectM }] : []}
            value={data?.total_projectM}
            value_label="Project Managers"
            cardFooterTitle="Project Managers Users"
            cardFooterDesc="radial charts that show the number of  Poject Managers on users"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
