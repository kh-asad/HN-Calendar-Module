import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../Models/calendar-event';

@Component({
  selector: 'event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit{

  @Input() selectedTime: string = ''; 
  @Output() eventAdded = new EventEmitter<CalendarEvent>();
  @Output() close = new EventEmitter<void>();
  newEvent: CalendarEvent = {
    id: this.generateId(),
    title: '',
    start: new Date(),
    color: '#4287f5',
  };

  ngOnInit(): void {
    const formattedDate = this.formatDateForDatetimeLocal(new Date(this.selectedTime));
    this.newEvent.start = new Date(formattedDate);
  }

  saveEvent() {
    if (this.newEvent.title) {
      // Ensure the start time is a Date object
      const startTime = new Date(this.newEvent.start);
      this.newEvent.start = startTime;

      this.eventAdded.emit(this.newEvent); // Emit the event data to the parent component
      this.closeModal(); // Close the modal after saving
    }
  }
 
  closeModal() {
    this.close.emit(); // Emit the close event to parent
    this.newEvent = { // Reset the event form
      id: this.generateId(),
      title: '',
      start: new Date(),
      color: '#4287f5',
    };
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  formatDateForDatetimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits for months
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}