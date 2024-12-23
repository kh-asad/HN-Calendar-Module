export interface CalendarViewOptions {
    showWeekNumbers?: boolean;
    highlightCurrentDay?: boolean;
    eventDisplayMode?: 'list' | 'dots'; // e.g., display events as dots in the month view
    hourInterval?: number; // Applicable for day view
  }