'use client';
import { ActivityFeed } from '@/components/Activity/ActivityFeed';
import { VolunteerHoursChart } from '@/components/Volunteer/VolunteerHoursChart';
import { VolunteerStats } from '@/components/Volunteer/VolunteerStats';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/firebase';
import { VolunteerLog } from '@/types/volunteer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { registerUser } = useAuth();
  const [logs, setLogs] = useState<VolunteerLog[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!registerUser) {
      router.replace('/login');
    }

    const fetchLogs = async () => {
      try {
        setLoading(true);
        const volunteerQuery = query(
          collection(db, 'volunteer_logs'),
          where('userId', '==', registerUser?.uid)
        );
        const querySnapshot = await getDocs(volunteerQuery);
        const userLogs = querySnapshot.docs.map((doc) => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [registerUser, router]);

  const totalHours = logs.reduce((acc, log) => acc + log.hours, 0);

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 text-center pt-6 pb-4">
        <h1 className="text-4xl font-bold">Welcome {registerUser?.displayName || 'Volunteer'}!</h1>
        <p className="text-xl text-gray-700 mb-8">Ready to make a difference in your community?</p>
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

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 px-6 pb-6 ">
          <VolunteerHoursChart logs={logs} />
          <ActivityFeed logs={logs} />
        </div>
      )}
    </main>
  );
}
