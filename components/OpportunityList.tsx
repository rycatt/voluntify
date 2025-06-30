import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { OpportunityListProps } from "@/types/opportunity";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";

export const OpportunityList = ({
  records,
  loading,
  error,
}: OpportunityListProps) => {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [participantCounts, setParticipantCount] = useState<{
    [key: string]: number;
  }>({});
  const [showDialogId, setShowDialogId] = useState("");

  if (error) {
    return <p>{error}</p>;
  }

  const handleVolunteerSignUp = (id: string) => {
    const isRegistered = registeredIds.includes(id);

    if (isRegistered) {
      setRegisteredIds((prev) => {
        return prev.filter((item) => item !== id);
      });
      setParticipantCount((prev) => ({
        ...prev,
        [id]:
          (prev[id] ||
            records.find((record) => record.id === id)?.fields.Participants ||
            0) - 1,
      }));
    } else {
      setRegisteredIds((prev) => [...prev, id]);

      setParticipantCount((prev) => ({
        ...prev,
        [id]:
          (prev[id] ||
            records.find((record) => record.id === id)?.fields.Participants ||
            0) + 1,
      }));
      setShowDialogId(id);
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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

          const currentParticipants =
            participantCounts[record.id] || Participants;
          const spotsAvailable = MaxParticipants - currentParticipants;

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
                <div>
                  <CardTitle className="text-xl font-bold line-clamp-2">
                    {Title}
                  </CardTitle>
                  <CardDescription className="text-md font-medium">
                    {Organization}
                  </CardDescription>
                </div>

                <p className="my-4">{Description}</p>

                <div className="space-y-2 text-md">
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
                    <span>{spotsAvailable} spots available</span>
                    {spotsAvailable <= 3 && spotsAvailable > 0 && (
                      <Badge className="bg-orange-100 text-orange-800 border-0 text-xs">
                        Almost Full
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <AlertDialog
                open={showDialogId === record.id}
                onOpenChange={(open) => !open && setShowDialogId("")}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => handleVolunteerSignUp(record.id)}
                    className={`cursor-pointer py-6 text-xl ${
                      registeredIds.includes(record.id)
                        ? "bg-gray-500 hover:bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-400"
                    }`}
                  >
                    {registeredIds.includes(record.id)
                      ? "Signed Up"
                      : "Sign Up"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl text-center">
                      You&apos;re signed up!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-center">
                      You&apos;ve successfully signed up for this opportunity.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => setShowDialogId("")}
                      className="w-full cursor-pointer"
                    >
                      Close
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* TODO: Show a success pop after signup */}
            </Card>
          );
        })}
      </div>
    </>
  );
};
