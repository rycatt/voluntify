'use client';
import { ActivityFeed } from '@/components/Activity/ActivityFeed';
import { VolunteerHoursChart } from '@/components/Volunteer/VolunteerHoursChart';
import { VolunteerStats } from '@/components/Volunteer/VolunteerStats';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 text-center pt-6 pb-4">
        <h1 className="text-4xl font-bold">Welcome {currentUser?.displayName || 'User'}!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Find volunteer opportunities near you and make a difference.
        </p>
      </div>

      <div className="flex-shrink-0 grid grid-cols-3 gap-6 px-6 pb-4">
        <VolunteerStats title="Total Hours" value={0} icon={<Clock size={30} />} />
        <VolunteerStats title="Activities" value={0} icon={<Calendar size={30} />} />
        <VolunteerStats title="Impact Score" value={0} icon={<TrendingUp size={30} />} />
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 pb-6 ">
        <VolunteerHoursChart />
        <ActivityFeed />
      </div>
    </main>
  );
}
