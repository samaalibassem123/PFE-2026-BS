import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalendarRangeProps {
  onDateChange?: (start: string | undefined, end: string | undefined) => void;
}

export function CalendarRange({ onDateChange }: CalendarRangeProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    const start = range?.from ? format(range.from, "yyyy-MM-dd") : undefined;
    const end = range?.to ? format(range.to, "yyyy-MM-dd") : undefined;

    onDateChange?.(start, end);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {dateRange?.from && dateRange?.to
            ? `${format(dateRange.from, "MMM dd, yyyy")} → ${format(dateRange.to, "MMM dd, yyyy")}`
            : "Select date range"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto mx-3">
        <Card className="mx-auto w-fit p-0">
          <CardContent className="p-0">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleSelect}
              captionLayout="dropdown"
              numberOfMonths={2}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
