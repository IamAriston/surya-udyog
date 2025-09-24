"use client";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { endOfToday, isAfter } from "date-fns";
import { Badge } from "../ui/badge";

export function AttendanceCalendar() {
  const presentDates = new Set(["2025-06-12", "2025-06-14", "2025-06-17"]);

  return (
    <Calendar
      mode="single"
      numberOfMonths={1}
      captionLayout="dropdown"
      className="w-full rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)] data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground"
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "long" }),
      }}
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const dateStr = day.date.toISOString().slice(0, 10);
          const isPresent = presentDates.has(dateStr);
          const isFuture = isAfter(day.date, endOfToday());

          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className="flex flex-col gap-4 data-[selected-single=true]:bg-accent data-[selected-single=true]:text-accent-foreground"
            >
              {children}
              {!modifiers.outside && !isFuture && (
                <span className="text-xs">
                  {isPresent ? (
                    <Badge
                      variant="outline"
                      className="text-muted-foreground px-1.5"
                    >
                      <div className="flex items-center gap-1 text-inherit">
                        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                        Present
                      </div>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-muted-foreground px-1.5"
                    >
                      <div className="flex items-center gap-1 text-inherit">
                        <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
                        Absent
                      </div>
                    </Badge>
                  )}
                </span>
              )}
            </CalendarDayButton>
          );
        },
      }}
    />
  );
}
