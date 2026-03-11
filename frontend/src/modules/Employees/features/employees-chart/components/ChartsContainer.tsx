import { ChartBarDefault } from '@/components/charts/chart-bar-default';
import { ChartRadialText } from '@/components/charts/chart-radial-text'
import { PieChart } from '@/components/charts/PieChart';

const chartData = [
  { department: "Human Resources", employees: 12 },
  { department: "Finance", employees: 9 },
  { department: "Marketing", employees: 15 },
  { department: "Sales", employees: 21 },
  { department: "IT", employees: 18 },
  { department: "Customer Support", employees: 14 },
  { department: "Operations", employees: 17 },
  { department: "Logistics", employees: 10 },
  { department: "Procurement", employees: 8 },
  { department: "Legal", employees: 6 },
  { department: "Administration", employees: 11 },
  { department: "Research & Development", employees: 13 },
  { department: "Quality Assurance", employees: 7 },
  { department: "Training", employees: 5 },
  { department: "Public Relations", employees: 6 },
  { department: "Security", employees: 9 },
];

export default function ChartsContainer() {
  return (
    <div className="flex gap-3 h-fit ">
      <ChartRadialText />
      <PieChart />

      <ChartBarDefault chartData={chartData} />
    </div>
  );
}
