import { ActivityCard } from "./ActivityCard";

export const ActivityFeed = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
      <div className="flex flex-col gap-4 border p-4 rounded-lg h-full shadow-sm">
        <ActivityCard />
      </div>
    </div>
  );
};
