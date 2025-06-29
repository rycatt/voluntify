import { ActivityFeed } from "@/components/Activity/ActivityFeed";
import { VolunteerHoursChart } from "@/components/Volunteer/VolunteerHoursChart";
import { VolunteerStats } from "@/components/Volunteer/VolunteerStats";
import { Calendar, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Find volunteer hours near you and make a difference.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <VolunteerStats
          title="Total Hours"
          value={9}
          icon={<Clock size={30} />}
        />
        <VolunteerStats
          title="Activities"
          value={2}
          icon={<Calendar size={30} />}
        />
        <VolunteerStats
          title="Impact Score"
          value={77}
          icon={<TrendingUp size={30} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-12">
        <VolunteerHoursChart />
        <ActivityFeed />
      </div>
    </main>
  );
}
