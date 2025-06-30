import { VolunteerLog } from '@/types/volunteer';
import { format } from 'date-fns';
import { Dot, Handshake } from 'lucide-react';

export const ActivityCard = ({ log }: { log: VolunteerLog }) => {
  return (
    <div className="flex items-center gap-4 bg-slate-200/25 px-3 py-2 rounded-lg hover:bg-slate-200/55 duration-200 transition-colors">
      <Handshake />
      <div className="cursor-pointer">
        <p className="font-semibold">{log.opportunity}</p>
        <span className="text-gray-600 flex items-center gap-1">
          {format(log.date, 'MMM dd, yyyy')} <Dot /> {log.hours} hours
        </span>
      </div>
    </div>
  );
};
