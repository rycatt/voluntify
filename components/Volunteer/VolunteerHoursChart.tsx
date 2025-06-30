'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { subWeeks, startOfWeek, format, isSameWeek } from 'date-fns';

export const VolunteerHoursChart = ({ logs }: { logs: { date: Date; hours: number }[] }) => {
  const today = new Date();

  const weeklyData = Array.from({ length: 8 }, (__, i) => {
    const weekStart = startOfWeek(subWeeks(today, 7 - i));
    const weekHours = logs
      .filter((log) => isSameWeek(log.date, weekStart, { weekStartsOn: 0 }))
      .reduce((sum, log) => sum + log.hours, 0);

    return {
      week: format(weekStart, 'MMM d'),
      hours: weekHours,
    };
  });

  const chartConfig = {
    hours: {
      label: 'Hours',
      color: '#2b7fff',
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-col h-full mt-12">
      <h2 className="text-2xl font-semibold mb-4">Your Volunteer Hours</h2>
      <div className="border rounded-lg p-4 shadow-sm">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="#2b7fff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
