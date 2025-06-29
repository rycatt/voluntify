import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { OpportunityListProps } from "@/types";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

export const OpportunityList = ({
  records,
  loading,
  error,
}: OpportunityListProps) => {
  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <p className="mb-4 font-semibold text-gray-600">
        Showing {Math.min(records.length, 6)} of {records.length} opportunities
      </p>
      <div className="grid grid-cols-3">
        {records.map((record) => {
          const {
            Title,
            Description,
            Organization,
            Location,
            Date,
            Duration,
            Participants,
            "Max Participants": MaxParticipants,
            Thumbnail,
          } = record.fields;

          return (
            <Card key={record.id} className="p-4 max-w-xl mx-auto">
              {Thumbnail?.[0] && (
                <Image
                  src={Thumbnail[0].url}
                  alt={Title}
                  width={Thumbnail[0].width}
                  height={Thumbnail[0].height}
                  className="mt-4 w-full h-72 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-2xl">{Title}</CardTitle>
                <CardDescription className="text-md">
                  {Organization}
                </CardDescription>
                <p className="my-4">{Description}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{Location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{Date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{Duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{MaxParticipants - Participants} spots available</span>
                </div>
              </div>
              <Button className="cursor-pointer bg-blue-500 hover:bg-blue-400 py-6 text-xl">
                Sign Up
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
};
