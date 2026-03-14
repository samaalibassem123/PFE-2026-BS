import { ChartBarDefault } from '@/components/charts/chart-bar-default';

import { PieChart } from '@/components/charts/PieChart';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { department: "hr", employees: 12, fill: "var(--color-hr)" },
  { department: "finance", employees: 9, fill: "var(--color-finance)" },
  { department: "marketing", employees: 15, fill: "var(--color-marketing)" },
  { department: "sales", employees: 21, fill: "var(--color-sales)" },
  { department: "it", employees: 18, fill: "var(--color-it)" },
  { department: "support", employees: 14, fill: "var(--color-support)" },
  { department: "operations", employees: 17, fill: "var(--color-operations)" },
  { department: "logistics", employees: 10, fill: "var(--color-logistics)" },
  { department: "procurement", employees: 8, fill: "var(--color-procurement)" },
  { department: "legal", employees: 6, fill: "var(--color-legal)" },
  {
    department: "administration",
    employees: 11,
    fill: "var(--color-administration)",
  },
  { department: "rnd", employees: 13, fill: "var(--color-rnd)" },
  { department: "qa", employees: 7, fill: "var(--color-qa)" },
  { department: "training", employees: 5, fill: "var(--color-training)" },
  { department: "pr", employees: 6, fill: "var(--color-pr)" },
  { department: "security", employees: 9, fill: "var(--color-security)" },
];


const chartConfig = {
  employees: {
    label: "Employees",
  },
  hr: {
    label: "Human Resources",
    color: "var(--chart-1)",
  },
  finance: {
    label: "Finance",
    color: "var(--chart-2)",
  },
  marketing: {
    label: "Marketing",
    color: "var(--chart-3)",
  },
  sales: {
    label: "Sales",
    color: "var(--chart-4)",
  },
  it: {
    label: "IT",
    color: "var(--chart-5)",
  },
  support: {
    label: "Customer Support",
    color: "var(--chart-6)",
  },
  operations: {
    label: "Operations",
    color: "var(--chart-7)",
  },
  logistics: {
    label: "Logistics",
    color: "var(--chart-8)",
  },
  procurement: {
    label: "Procurement",
    color: "var(--chart-9)",
  },
  legal: {
    label: "Legal",
    color: "var(--chart-10)",
  },
  administration: {
    label: "Administration",
    color: "var(--chart-11)",
  },
  rnd: {
    label: "Research & Development",
    color: "var(--chart-12)",
  },
  qa: {
    label: "Quality Assurance",
    color: "var(--chart-13)",
  },
  training: {
    label: "Training",
    color: "var(--chart-14)",
  },
  pr: {
    label: "Public Relations",
    color: "var(--chart-15)",
  },
  security: {
    label: "Security",
    color: "var(--chart-16)",
  },
} satisfies ChartConfig;

export default function ChartsContainer() {
  return (
    <div className="flex sm:flex-row flex-col w-full gap-3 h-fit ">
      <PieChart
        chartData={chartData}
        chartConfig={chartConfig}
        dataKey="employees"
        nameKey="department"
        title="Employees by Department"
        description="Company structure"
      />
      <ChartBarDefault
        chartData={chartData}
        chartConfig={chartConfig}
        xKey="department"
        yKey="employees"
        title="Employees by Department"
        description="Company structure"
      />
    </div>
  );
}
