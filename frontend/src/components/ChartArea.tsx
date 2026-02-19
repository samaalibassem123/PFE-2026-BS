"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", avg_hours: 222 },
  { date: "2024-04-02", avg_hours: 97 },
  { date: "2024-04-03", avg_hours: 167 },
  { date: "2024-04-04", avg_hours: 242 },
  { date: "2024-04-05", avg_hours: 373 },
  { date: "2024-04-06", avg_hours: 301 },
  { date: "2024-04-07", avg_hours: 245 },
  { date: "2024-04-08", avg_hours: 409 },
  { date: "2024-04-09", avg_hours: 59 },
  { date: "2024-04-10", avg_hours: 261 },
  { date: "2024-04-11", avg_hours: 327 },
  { date: "2024-04-12", avg_hours: 292 },
  { date: "2024-04-13", avg_hours: 342 },
  { date: "2024-04-14", avg_hours: 137 },
  { date: "2024-04-15", avg_hours: 120 },
  { date: "2024-04-16", avg_hours: 138 },
  { date: "2024-04-17", avg_hours: 446 },
  { date: "2024-04-18", avg_hours: 364 },
  { date: "2024-04-19", avg_hours: 243 },
  { date: "2024-04-20", avg_hours: 89 },
  { date: "2024-04-21", avg_hours: 137 },
  { date: "2024-04-22", avg_hours: 224 },
  { date: "2024-04-23", avg_hours: 138 },
  { date: "2024-04-24", avg_hours: 387 },
  { date: "2024-04-25", avg_hours: 215 },
  { date: "2024-04-26", avg_hours: 75 },
  { date: "2024-04-27", avg_hours: 383 },
  { date: "2024-04-28", avg_hours: 122 },
  { date: "2024-04-29", avg_hours: 315 },
  { date: "2024-04-30", avg_hours: 454 },
  { date: "2024-05-01", avg_hours: 165 },
  { date: "2024-05-02", avg_hours: 293 },
  { date: "2024-05-03", avg_hours: 247 },
  { date: "2024-05-04", avg_hours: 385 },
  { date: "2024-05-05", avg_hours: 481 },
  { date: "2024-05-06", avg_hours: 498 },
  { date: "2024-05-07", avg_hours: 388 },
  { date: "2024-05-08", avg_hours: 149 },
  { date: "2024-05-09", avg_hours: 227 },
  { date: "2024-05-10", avg_hours: 293 },
  { date: "2024-05-11", avg_hours: 335 },
  { date: "2024-05-12", avg_hours: 197 },
  { date: "2024-05-13", avg_hours: 197 },
  { date: "2024-05-14", avg_hours: 448 },
  { date: "2024-05-15", avg_hours: 473 },
  { date: "2024-05-16", avg_hours: 338 },
  { date: "2024-05-17", avg_hours: 499 },
  { date: "2024-05-18", avg_hours: 315 },
  { date: "2024-05-19", avg_hours: 235 },
  { date: "2024-05-20", avg_hours: 177 },
  { date: "2024-05-21", avg_hours: 82 },
  { date: "2024-05-22", avg_hours: 81 },
  { date: "2024-05-23", avg_hours: 252 },
  { date: "2024-05-24", avg_hours: 294 },
  { date: "2024-05-25", avg_hours: 201 },
  { date: "2024-05-26", avg_hours: 213 },
  { date: "2024-05-27", avg_hours: 420 },
  { date: "2024-05-28", avg_hours: 233 },
  { date: "2024-05-29", avg_hours: 78 },
  { date: "2024-05-30", avg_hours: 340 },
  { date: "2024-05-31", avg_hours: 178 },
  { date: "2024-06-01", avg_hours: 178 },
  { date: "2024-06-02", avg_hours: 470 },
  { date: "2024-06-03", avg_hours: 103 },
  { date: "2024-06-04", avg_hours: 439 },
  { date: "2024-06-05", avg_hours: 88 },
  { date: "2024-06-06", avg_hours: 294 },
  { date: "2024-06-07", avg_hours: 323 },
  { date: "2024-06-08", avg_hours: 385 },
  { date: "2024-06-09", avg_hours: 438 },
  { date: "2024-06-10", avg_hours: 155 },
  { date: "2024-06-11", avg_hours: 92 },
  { date: "2024-06-12", avg_hours: 492 },
  { date: "2024-06-13", avg_hours: 81 },
  { date: "2024-06-14", avg_hours: 426 },
  { date: "2024-06-15", avg_hours: 307 },
  { date: "2024-06-16", avg_hours: 371 },
  { date: "2024-06-17", avg_hours: 475 },
  { date: "2024-06-18", avg_hours: 107 },
  { date: "2024-06-19", avg_hours: 341 },
  { date: "2024-06-20", avg_hours: 408 },
  { date: "2024-06-21", avg_hours: 169 },
  { date: "2024-06-22", avg_hours: 317 },
  { date: "2024-06-23", avg_hours: 480 },
  { date: "2024-06-24", avg_hours: 132 },
  { date: "2024-06-25", avg_hours: 141 },
  { date: "2024-06-26", avg_hours: 434 },
  { date: "2024-06-27", avg_hours: 448 },
  { date: "2024-06-28", avg_hours: 149 },
  { date: "2024-06-29", avg_hours: 103 },
  { date: "2024-06-30", avg_hours: 446 },
];

const chartConfig = {
  avg_hours: {
    label: "Average Hours",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  desc: string;
  chartConfig?: ChartConfig;
  chartData: any[]; // format [{date:'AAAA/MM/DD', value1, value2...}]
}

export function ChartArea({ ...props }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillAvgHours" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-avg_hours)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-avg_hours)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAvgHours" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-avg_hours)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-avg_hours)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="avg_hours"
              type="natural"
              fill="url(#fillAvgHours)"
              stroke="var(--color-avg_hours)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
