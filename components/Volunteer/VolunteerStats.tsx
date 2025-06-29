import { ReactNode } from "react";

interface VolunteerStatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export const VolunteerStats = ({ title, value, icon }: VolunteerStatsProps) => {
  return (
    <div className="flex items-center justify-between space-x-12 border px-8 py-4 shadow-sm rounded-lg cursor-pointer">
      <div>
        <p className="text-gray-600 font-semibold">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
};
