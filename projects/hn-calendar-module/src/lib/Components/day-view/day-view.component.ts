import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarService } from '../../Services/calendar.service';
import { CalendarEvent } from '../../Models/calendar-event';

@Component({
  selector: 'hn-calendar-day',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit,OnChanges {

  daySlots: Array<{ time: string, events: any[] }> = [];
  currentDay: Date = new Date();
  @Input() events: CalendarEvent[] = [];
  @Output() slotClicked = new EventEmitter<Date>();
  formattedSelectedTime:string='';

  isModalOpen = false; // Flag to track if the modal is open
  selectedSlotTime: Date | null = null; // Store the selected slot time

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.updateDayView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['events']){
      this.updateDayView();
    }
  }

  updateDayView() {
    // Generate the day slots (24 hourly slots) for the current day
    const startOfDay = new Date(this.currentDay.setHours(0, 0, 0, 0)); // Start of the day at midnight
    this.daySlots = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(startOfDay);
      hour.setHours(i); // Set each slot's time
      const timeString = hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as "HH:mm"

      // Filter events that fall within this hour slot
      const eventsForThisSlot = this.events.filter(event =>
        event.start.getHours() === i && event.start.getDate() === this.currentDay.getDate() &&
        event.start.getMonth() === this.currentDay.getMonth() && event.start.getFullYear() === this.currentDay.getFullYear()
      );

      return { time: timeString, events: eventsForThisSlot };
    });
  }


  // Open modal on slot click
  // Open modal on slot click
  openModal(slotTime: string) {
    const [hour, minute] = slotTime.split(':').map(Number); // Get the hour and minute from the time string
    const selectedTime = new Date(this.currentDay);
    selectedTime.setHours(hour, minute, 0, 0); // Set the selected hour and minute, keeping the same day
    
    this.selectedSlotTime = selectedTime; // Store the selected time for the event
    this.slotClicked.emit(this.selectedSlotTime);
    this.formattedSelectedTime = this.formatDateForDatetimeLocal(selectedTime);
    if(!this.slotClicked.observers.length){
      this.isModalOpen = true; // Open the modal  
    }
  }


  // Handle closing the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Add a new event (called from the modal)
  addEvent(newEvent: CalendarEvent) {
    newEvent.start = new Date(newEvent.start); // Ensure the event start time matches the slot time
    this.events.push(newEvent); // Add event to the list
    this.updateDayView(); // Refresh the day view with the new event
    this.closeModal(); // Close the modal
  }

  previousDay() {
    const previous = new Date(this.currentDay);
    previous.setDate(this.currentDay.getDate() - 1);
    this.currentDay = previous;
    this.updateDayView();
  }

  nextDay() {
    const next = new Date(this.currentDay);
    next.setDate(this.currentDay.getDate() + 1);
    this.currentDay = next;
    this.updateDayView();
  }

  formatDateForDatetimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}