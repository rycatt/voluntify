import { db } from "@/firebase/firebase";
import { DialogClose } from "@radix-ui/react-dialog";
import { addDoc, collection } from "firebase/firestore";
import {
  CalendarIcon,
  Clock,
  FileText,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export const CreateOpportunity = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const newOpportunity = {
    title: title,
    description: description,
    organization: organization,
    location: location,
    date: date,
    startTime: startTime,
    endTime: endTime,
    maxParticipants: maxParticipants,
    participants: 0,
  };

  const handleOpportunityCreation = async (e: FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "opportunities"), newOpportunity);

    setTitle("");
    setDescription("");
    setOrganization("");
    setLocation("");
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setMaxParticipants(10);

    setDialogOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Opportunity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Opportunity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOpportunityCreation} className="space-y-6">
          <div>
            <div className="flex items-center text-gray-600 mb-2 my-4">
              <Tag size={18} />
              <Label className="px-1">Event Title</Label>
            </div>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Beach Cleanup"
              required
            />
          </div>
          <div>
            <div className="flex items-center text-gray-600 mb-2 my-4">
              <Users size={18} />
              <Label className="px-1">Organization</Label>
            </div>
            <Input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              placeholder="e.g. Local Environmental Club"
            />
          </div>

          <div>
            <div className="flex items-center text-gray-600 mb-2 my-4">
              <FileText size={18} />
              <Label htmlFor="description" className="px-1">
                Description
              </Label>
            </div>
            <Textarea
              id="description"
              placeholder="Describe what volunteers will be doing..."
              className="resize-none h-24"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label
                htmlFor="date"
                className="mb-2 text-gray-600 flex items-center gap-1"
              >
                <CalendarIcon size={18} />
                Date
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-between"
                    type="button"
                  >
                    {date ? date.toLocaleDateString() : "Select Date"}
                    <CalendarIcon size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(selectedDate) => {
                      setDate(selectedDate ?? undefined);
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={18} />
                <Label htmlFor="location" className="px-1">
                  Location
                </Label>
              </div>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Central Park, NYC"
                maxLength={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock size={18} />
                <Label htmlFor="location" className="px-1">
                  Start Time
                </Label>
              </div>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock size={18} />
                <Label htmlFor="location" className="px-1">
                  End Time
                </Label>
              </div>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-600 mb-2 my-4">
              <Users size={18} />
              <Label className="px-1">Max Participants</Label>
            </div>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              required
              min="1"
              max="100"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              Create Opportunity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
