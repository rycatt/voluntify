import { VolunteerLog } from '@/types/volunteer';
import { ActivityCard } from './ActivityCard';

export const ActivityFeed = ({ logs }: { logs: VolunteerLog[] }) => {
  return (
    <div className="flex flex-col h-full mt-12">
      <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
      <div className="flex flex-col gap-4 border p-4 rounded-lg h-full shadow-sm overflow-auto min-h-0">
        {logs.map((log, i) => (
          <ActivityCard key={i} log={log} />
        ))}
      </div>
    </div>
  );
};
