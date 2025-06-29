export interface ImageAttachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface OpportunityRecordFields {
  Title: string;
  Description: string;
  'Event ID': number;
  Organization: string;
  Location: string;
  Date: string;
  Duration: string;
  Participants: number;
  'Max Participants': number;
  Thumbnail: ImageAttachment[] | undefined;
}

export interface OpportunityRecord {
  id: string;
  fields: OpportunityRecordFields;
}

export interface OpportunityListProps {
  records: OpportunityRecord[];
  loading: boolean;
  error: string | null;
}
