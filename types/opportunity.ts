export interface Opportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  participants: number;
  signups: string[];
}
