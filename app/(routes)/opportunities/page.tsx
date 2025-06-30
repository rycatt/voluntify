'use client';

import { LogHours } from '@/components/LogHours';
import { OpportunityList } from '@/components/OpportunityList';
import { Input } from '@/components/ui/input';
import { OpportunityRecord } from '@/types/opportunity';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState<OpportunityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PERSONAL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DATA_API_TOKEN;
  const BASE_ID = process.env.NEXT_PUBLIC_BASE_ID;
  const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME;

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME!)}`,
          { headers: { Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}` } }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        console.log(data.records);
        setRecords(data.records);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Can't load opportunities: ${err.message}`);
        } else {
          setError('Something went wrong loading opportunities');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, [PERSONAL_ACCESS_TOKEN, BASE_ID, TABLE_NAME]);

  // Filter opportunities based on the user's search
  const filteredRecords = records.filter((record) => {
    if (query.trim() === '') return true;
    return record.fields.Title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen pt-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Volunteer Opportunities</h1>
        <p className="text-gray-600 font-medium text-lg">
          Find meaningful ways to make a difference in your community
        </p>
      </div>

      <form className="flex flex-col max-w-4xl p-4">
        <div className="flex gap-4 items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            placeholder="Search opportunities..."
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <LogHours records={records} />
        </div>
      </form>

      <OpportunityList records={filteredRecords} loading={loading} error={error} />
    </div>
  );
}
