import { Accessibility, Dot } from "lucide-react";

export const ActivityCard = () => {
  return (
    <div className="flex items-center gap-4 bg-slate-200/65 px-3 py-2 rounded-lg">
      <Accessibility />
      <div className="cursor-pointer">
        <p className="font-semibold">Community Garden Cleanup</p>
        <span className="text-gray-600 flex items-center gap-1">
          Jan 14, 2024 <Dot /> 4 hours
        </span>
      </div>
    </div>
  );
};
