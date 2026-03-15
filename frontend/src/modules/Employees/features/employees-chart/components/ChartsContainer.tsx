import { PieChart } from '@/components/charts/PieChart';
import { useEmployeByDepartment } from '../hooks/useEmployChartQueries';
import { useMemo } from 'react';


export default function ChartsContainer() {
  const {data} = useEmployeByDepartment()

 const chartData = useMemo(() => {
   return (
     data?.map((item, index) => ({
       department: item.department.toLowerCase(),
       employees: item.employees,
       fill: `var(--chart-${index + 1})`,
     })) ?? []
   );
 }, [data]);

 const chartConfig = useMemo(() => {
   return {
     employees: { label: "Employees" },
     ...data?.reduce(
       (acc, item) => {
         const key = item.department.toLowerCase();
         acc[key] = { label: item.department };
         return acc;
       },
       {} as Record<string, { label: string }>,
     ),
   };
 }, [data]);

  return (
    <div className="flex sm:flex-row flex-col w-full gap-3 h-fit ">
      <PieChart
        chartData={chartData ?? []}
        chartConfig={chartConfig}
        dataKey="employees"
        nameKey="department"
        title="Employees by Department"
        description="Company structure"
      />
    </div>
  );
}
