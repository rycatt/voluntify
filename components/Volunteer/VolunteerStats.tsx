import { ReactNode } from 'react';

interface VolunteerStatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
}

export const VolunteerStats = ({ title, value, icon, bgColor }: VolunteerStatsProps) => {
  return (
    <div
      className={`flex items-center justify-between space-x-12 px-10 py-4 rounded-3xl cursor-pointer ${bgColor}`}
    >
      <div className="bg-white p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-3xl text-white font-bold">{value}</p>
      </div>
    </div>
  );
};
