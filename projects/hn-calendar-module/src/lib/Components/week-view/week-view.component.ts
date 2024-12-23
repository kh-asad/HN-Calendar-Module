import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../Models/calendar-event';

@Component({
  selector: 'hn-calendar-week',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit,OnChanges {
  
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekStartDate: Date = new Date();
  weekEndDate: Date = new Date();
  monthDisplay: string = '';  // New variable to store the month and year display
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  weekDays: Array<{
    date: Date;
    events: { title: string, hour: number, color: string, topPosition: number }[];  // Add topPosition to events
    moreEvents?: string; // Optional moreEvents property
  }> = [];
  @Input() events: CalendarEvent[] = [];
  @Output() slotClicked = new EventEmitter<Date>();
  maxEventsToShow = 2;

  isModalOpen = false;
  selectedSlotTime: Date | null = null;
  formattedSelectedTime: string = '';

  ngOnInit(): void {
    this.initializeCurrentWeek();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['events']){
      this.updateWeekDates();
    }
  }

  initializeCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    this.weekStartDate = new Date(today);
    this.weekStartDate.setDate(today.getDate() - dayOfWeek);
    this.updateWeekDates();
    this.updateMonthDisplay();  // Update month display initially
  }

  updateWeekDates() {
    this.weekEndDate = new Date(this.weekStartDate);
    this.weekEndDate.setDate(this.weekStartDate.getDate() + 6);
    this.populateWeekDays();
  }

  populateWeekDays() {
    // const maxEventsPerSlot = 3; 
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(this.weekStartDate);
      date.setDate(this.weekStartDate.getDate() + i);

      // Create a structure to hold events for each hour
      // const hourlyEvents = Array.from({ length: 24 }, () => []);

      // Create a flat array to hold events for each hour of the day
      const dailyEvents: { title: string, hour: number, color: string, topPosition: number }[] = [];

      // Filter and map events for this day
      const filteredEvents = this.events.filter(event =>
        event.start.getFullYear() === date.getFullYear() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getDate() === date.getDate()
      );

      // Map events to their respective hourly slot
      filteredEvents.forEach(event => {
        const hour = event.start.getHours();
        const topPosition = (dailyEvents.filter(e => e.hour === hour).length * 30); // Calculate top position based on number of events
        dailyEvents.push({ title: event.title, hour, color: event.color || '#007bff', topPosition });
      });

      return {
        date,
        events: dailyEvents
      };
    });
  }

  openModal(day: Date, hour: number) {
    const selectedTime = new Date(day);
    selectedTime.setHours(hour, 0, 0, 0);
    this.selectedSlotTime = selectedTime;
    this.slotClicked.emit(selectedTime);
    this.formattedSelectedTime = this.formatDateForDatetimeLocal(selectedTime);
    if(!this.slotClicked.observers.length){
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addEvent(newEvent: CalendarEvent) {
    newEvent.start = new Date(newEvent.start);
    this.events.push(newEvent);
    this.populateWeekDays();
    this.closeModal();
  }

  getEventsForHour(day: any, hour: number) {
    const events= day.events.filter((event: any) => event.hour === hour);
    return events.splice(0,this.maxEventsToShow)
  }

  getEventCountForHour(day: any, hour: number) {
    return day.events.filter((event: any) => event.hour === hour).length;
  }

  previousWeek() {
    this.weekStartDate.setDate(this.weekStartDate.getDate() - 7);
    this.updateWeekDates();
    this.updateMonthDisplay();
  }

  nextWeek() {
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7);
    this.updateWeekDates();
    this.updateMonthDisplay();
  }

  updateMonthDisplay() {
    const startMonth = this.weekStartDate.toLocaleString('default', { month: 'long' });
    const startYear = this.weekStartDate.getFullYear();
    const endMonth = this.weekEndDate.toLocaleString('default', { month: 'long' });
    const endYear = this.weekEndDate.getFullYear();
  
    if (startYear === endYear) {
      this.monthDisplay = startMonth === endMonth 
        ? `${startMonth} ${startYear}` 
        : `${startMonth} - ${endMonth} ${startYear}`;
    } else {
      this.monthDisplay = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  }

  formatDateForDatetimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}