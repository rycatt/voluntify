'use client';
import { ActivityFeed } from '@/components/Activity/ActivityFeed';
import { VolunteerHoursChart } from '@/components/Volunteer/VolunteerHoursChart';
import { VolunteerStats } from '@/components/Volunteer/VolunteerStats';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface VolunteerLog {
  date: Date;
  description: string;
  hours: number;
  opportunity: string;
  reflection: string;
}

export default function HomePage() {
  const { currentUser } = useAuth();
  const [logs, setLogs] = useState<VolunteerLog[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }

    const fetchLogs = async () => {
      const q = query(collection(db, 'volunteer_logs'), where('userId', '==', currentUser?.uid));
      const snapshot = await getDocs(q);
      const userLogs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          date: data.date.toDate(),
          description: data.description,
          hours: data.hours,
          opportunity: data.opportunity,
          reflection: data.reflection,
        };
      });
      setLogs(userLogs);
    };
    fetchLogs();
  }, [currentUser, router]);

  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 text-center pt-6 pb-4">
        <h1 className="text-4xl font-bold">Welcome {currentUser?.displayName || 'Volunteer'}!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Find volunteer opportunities near you and make a difference.
        </p>
      </div>

      <div className="flex-shrink-0 grid grid-cols-3 gap-6 px-6 pb-4">
        <VolunteerStats
          title="Total Hours"
          value={totalHours}
          icon={<Clock size={30} color="blue" />}
          bgColor="bg-blue-500"
        />
        <VolunteerStats
          title="Activities"
          value={logs.length}
          icon={<Calendar size={30} color="indigo" />}
          bgColor="bg-indigo-500"
        />
        <VolunteerStats
          title="Impact Score"
          value={totalHours * 1.5}
          icon={<TrendingUp size={30} color="cyan" />}
          bgColor="bg-cyan-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 pb-6 ">
        <VolunteerHoursChart logs={logs} />
        <ActivityFeed />
      </div>
    </main>
  );
}
