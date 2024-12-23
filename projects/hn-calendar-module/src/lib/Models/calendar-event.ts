
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end?: Date;
    description?: string;
    color?: string; // Custom color for each event
    isAllDay?: boolean;
    meta?: any; // Optional metadata for additional details
  }