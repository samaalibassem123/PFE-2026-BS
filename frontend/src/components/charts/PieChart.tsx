import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart as RechartsPieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import dayjs from "dayjs";

interface Props {
  chartConfig: ChartConfig;
  chartData: any[];
  dataKey: string; // numeric value (ex: visitors, employees, sales)
  nameKey: string; // category name (ex: browser, department)
  title?: string;
  description?: string;
}

export function PieChart({
  chartConfig,
  chartData,
  dataKey,
  nameKey,
  title = "Pie Chart",
  description = "",
}: Props) {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + (curr[dataKey] || 0), 0);
  }, [chartData, dataKey]);

const date = dayjs(new Date()).format("YYYY-MM-DD")


  return (
    <Card className="flex-1  max-h-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartConfig[dataKey]?.label ?? dataKey}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
              Showing Pie chart data distribution
              <TrendingUp className="h-4 w-4" />
            </div>

            <div className="leading-none text-muted-foreground">{date}</div>
      </CardFooter>
    </Card>
  );
}
