import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
  cardFooterTitle?: string;
  cardFooterDesc?: string;
  value_label?: string;
  value?: number;
  chartConfig: ChartConfig;
  chartData: any[];
}

export const description = "A radial chart with stacked sections";

export function RadialChart({ ...props }: Props) {
  console.log(props.chartData);
  const date = new Date();

  const formated_date = dayjs(date).format("YYYY/MM/DD HH:MM");

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <CardDescription>{formated_date}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={props.chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] h-45"
        >
          <RadialBarChart
            data={props.chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {props.value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          {props.value_label ?? "Total"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {Object.entries(props.chartConfig).map(([key, config]) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={4}
                fill={config.color}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {props.cardFooterTitle}
        </div>
        <div className="text-muted-foreground leading-none">
          {props.cardFooterDesc}
        </div>
      </CardFooter>
    </Card>
  );
}
