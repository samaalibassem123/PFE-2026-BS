import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import * as React from "react";
import dayjs from 'dayjs';

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

interface Props {
  chartData: any[];
  chartConfig:ChartConfig
  xKey?: string;
  yKey?: string;
  title?: string;
  description?: string;
}

export function ChartBarDefault({
  chartData,
  chartConfig,
  xKey,
  yKey,
  title = "Bar Chart",
  description = "",
}: Props) {

  const keys = React.useMemo(() => {
    if (!chartData?.length) return [];
    return Object.keys(chartData[0]);
  }, [chartData]);

  const categoryKey = xKey ?? keys[0];
  const valueKey = yKey ?? keys[1];


const date = dayjs(new Date()).format("YYYY-MM-DD")

  return (
    <Card className=" flex-1  max-h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                typeof value === "string" ? value.slice(0, 3) : value
              }
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey={valueKey} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing chart data distribution
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">{date}</div>
      </CardFooter>
    </Card>
  );
}
