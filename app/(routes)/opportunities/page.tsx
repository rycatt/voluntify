"use client";

import { OpportunityList } from "@/components/OpportunityList";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen pt-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Volunteer Opportunities</h1>
        <p className="text-gray-600 font-medium text-lg">
          Find meaningful ways to make a difference in your community
        </p>
      </div>

      <OpportunityList />
    </div>
  );
}
