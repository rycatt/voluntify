import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase";
import { Opportunity } from "@/types/opportunity";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { LogHours } from "./LogHours";
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

export const OpportunityList = () => {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [showDialogId, setShowDialogId] = useState("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const { registerUser } = useAuth();

  useEffect(() => {
    const getOpportunities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "opportunities"));
        const opportunityList: Opportunity[] = [];
        const userSignedUpIds: string[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.data().signups.includes(registerUser?.uid)) {
            userSignedUpIds.push(doc.id);
          }
          opportunityList.push({ id: doc.id, ...doc.data() } as Opportunity);
        });

        console.log("Opportunity List:", opportunityList);

        setRegisteredIds(userSignedUpIds);
        setOpportunities(opportunityList);
      } finally {
        setLoading(false);
      }
    };

    getOpportunities();
  }, [registerUser]);

  const handleVolunteerSignUp = async (id: string) => {
    const opportunity = opportunities.find(
      (opportunity) => opportunity.id === id
    );
    if (!opportunity) {
      console.log(`Opportunity ID:${id} is not found`);
      return;
    }

    await updateDoc(doc(db, "opportunities", id), {
      participants: opportunity.participants + 1,
      signups: arrayUnion(registerUser?.uid),
    });

    setOpportunities((prev) =>
      prev.map((opportunity) =>
        opportunity.id === id
          ? {
              ...opportunity,
              participants: opportunity.participants + 1,
              signups: [
                ...(opportunity.signups || []),
                registerUser?.uid ?? "unknown-user",
              ],
            }
          : opportunity
      )
    );

    setShowDialogId(id);
    setRegisteredIds((prev) => [...prev, id]);
  };

  return (
    <>
      <p className="my-4 font-semibold text-gray-600">
        Showing {opportunities.length}{" "}
        {opportunities.length > 1 ? "opportunities" : "opportunity"}
      </p>
      <div className="mb-4">
        <LogHours opportunities={opportunities} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {loading && (
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
        )}
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="p-4 max-w-xl mx-auto">
            <div className="flex-1">
              <div>
                <CardTitle className="text-xl font-bold line-clamp-2">
                  {opportunity.title}
                </CardTitle>
                <CardDescription className="text-md font-medium">
                  {opportunity.organization}
                </CardDescription>
              </div>

              <p className="my-4">{opportunity.description}</p>

              <div className="space-y-2 text-md">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{opportunity.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {opportunity.startTime} - {opportunity.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Participants: </span>
                  <span className="ml-2">
                    {`${opportunity.participants} / ${opportunity.maxParticipants}`}
                  </span>
                </div>
              </div>
            </div>

            <AlertDialog
              open={showDialogId === opportunity.id}
              onOpenChange={(open) => !open && setShowDialogId("")}
            >
              <AlertDialogTrigger asChild>
                <Button
                  disabled={registeredIds.includes(opportunity.id)}
                  onClick={() => handleVolunteerSignUp(opportunity.id)}
                  className={`cursor-pointer py-6 text-xl ${
                    registeredIds.includes(opportunity.id)
                      ? "bg-gray-500 hover:bg-gray-400"
                      : opportunity.participants >= opportunity.maxParticipants
                      ? "bg-gray-500 hover:bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-400"
                  }`}
                >
                  {registeredIds.includes(opportunity.id)
                    ? "Signed Up"
                    : opportunity.participants >= opportunity.maxParticipants
                    ? "Full"
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
          </Card>
        ))}
      </div>
    </>
  );
};
