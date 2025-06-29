"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { week: "Week 1", hours: 3 },
  { week: "Week 2", hours: 5 },
  { week: "Week 3", hours: 2 },
  { week: "Week 4", hours: 4 },
  { week: "Week 5", hours: 6 },
  { week: "Week 6", hours: 3 },
  { week: "Week 7", hours: 7 },
  { week: "Week 8", hours: 5 },
];
const chartConfig = {
  hours: {
    label: "Hours",
    color: "#2b7fff",
  },
} satisfies ChartConfig;

export const VolunteerHoursChart = () => {
  return (
    <div className="w-full h-96 mt-12">
      <h2 className="text-2xl font-semibold mb-4">Your Volunteer Hours</h2>
      <div className="border rounded-lg p-4 shadow-sm">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="#2b7fff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
