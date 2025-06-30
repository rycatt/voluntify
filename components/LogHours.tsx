import { CalendarIcon, Clock, FileText, Lightbulb, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from './ui/select';
import { Label } from './ui/label';
import { OpportunityRecord } from '@/types/opportunity';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';

export const LogHours = ({ records }: { records: OpportunityRecord[] }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="cursor-pointer">
          <Plus /> Log Hours
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Volunteer Hours</DialogTitle>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-2">
            <Label className="mb-2 text-gray-600">Volunteer Opportunity</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an opportunity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Opportunities</SelectLabel>
                  {records.map((record) => (
                    <SelectItem key={record.id} value={record.fields.Title}>
                      {record.fields.Title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex items-center text-gray-600 mb-2 my-4">
                  <CalendarIcon size={18} />
                  <Label htmlFor="date" className="px-1">
                    Date
                  </Label>
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-48 justify-between">
                      {date ? date.toLocaleDateString() : 'Select Date'}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-2 my-4">
                  <Clock size={18} />
                  <Label className="px-1">Hours Logged</Label>
                </div>
                <Input type="number" required />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center text-gray-600 mb-2 my-4">
                  <FileText size={18} />
                  <Label htmlFor="description" className="px-1">
                    Activity Description
                  </Label>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe what you did during your volunteer work..."
                  className="resize-none h-24"
                />
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-2 my-4">
                  <Lightbulb size={18} />
                  <Label htmlFor="reflection" className="px-1">
                    Personal Reflection
                  </Label>
                </div>
                <Textarea
                  id="reflection"
                  placeholder="How did this experience impact you? What did you learn? How did it make you feel?"
                  className="resize-none h-24"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                Submit Hours
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
