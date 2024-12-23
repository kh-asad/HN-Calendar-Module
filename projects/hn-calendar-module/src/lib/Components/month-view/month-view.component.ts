import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../Models/calendar-event';
import { CalendarViewOptions } from '../../Models/calendar-view-options';
import { CalendarService } from '../../Services/calendar.service';

@Component({
  selector: 'hn-calendar-month',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit, OnChanges {

  @Input() events: CalendarEvent[] = []; // Input to receive events from demo app
  @Output() slotClicked = new EventEmitter<Date>();

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: Array<{ date: Date; otherMonth: boolean; events: CalendarEvent[] }> = [];
  currentMonth: number = 1;
  currentYear: number = 2024;
  monthName: string = 'January';

  maxEventsToShow = 3; // Limit the number of displayed events per day
  defaultEventColor = '#007bff'; // Default color if not specified

  isModalOpen = false;
  selectedDate: Date | null = null;

  hoveredEvent: CalendarEvent | null = null;
  tooltipPosition = { x: 0, y: 0 };


  constructor(
    private calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.updateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.assignEventsToDays();
    }
  }

  updateCalendar() {
    // Generate the days in the current month
    this.daysInMonth = this.calendarService.generateDaysForMonth(this.currentYear, this.currentMonth);

    // Assign events to the corresponding dates
    this.assignEventsToDays();
    this.monthName = this.calendarService.getMonthName(this.currentMonth);
  }

  assignEventsToDays() {
    // Clear any existing events in each day
    this.daysInMonth.forEach(day => day.events = []);

    // Map each event to its corresponding day by matching the exact date
    this.events.forEach(event => {
      const matchingDay = this.daysInMonth.find(day => 
        day.date.getDate() === event.start.getDate() &&
        day.date.getMonth() === event.start.getMonth() &&
        day.date.getFullYear() === event.start.getFullYear()
      );

      if (matchingDay) {
        matchingDay.events.push(event);
      }
    });
  }

  openModal(day: Date) {
    this.selectedDate = day;
    this.slotClicked.emit(day);
    if (!this.slotClicked.observers.length) {
      this.isModalOpen = true; // Use default modal if no custom modal is provided
    } 
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedDate = null;
  }

  addEvent(newEvent: CalendarEvent) {
    newEvent.start = new Date(newEvent.start);
    this.events.push(newEvent);  // Add new event to events array
    this.assignEventsToDays();    // Reassign events to update the view
    this.closeModal();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  showTooltip(event: MouseEvent, calendarEvent: CalendarEvent) {
    this.hoveredEvent = calendarEvent;
    this.tooltipPosition = { x: event.clientX, y: event.clientY };
    console.log(this.tooltipPosition)
  }

  hideTooltip() {
    this.hoveredEvent = null;
  }
}