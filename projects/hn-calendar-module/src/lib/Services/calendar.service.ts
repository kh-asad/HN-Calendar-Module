import { Injectable } from '@angular/core';
import { CalendarEvent } from '../Models/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Project Meeting',
      start: new Date('2024-11-10T10:00:00'),
      end: new Date('2024-11-10T11:00:00'),
      description: 'Discuss project milestones',
      color: '#FF5733',
    },
    {
      id: '2',
      title: 'Lunch Break',
      start: new Date('2024-11-10T12:00:00'),
      end: new Date('2024-11-10T13:00:00'),
      color: '#8ACE00',
    },
    {
      id: '3',
      title: 'Tea Break',
      start: new Date('2024-11-10T12:00:00'),
      end: new Date('2024-11-10T13:00:00'),
      color: '#8ACE00',
    },
    
    // Add more events as necessary
  ];

  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  constructor() { }

  generateDaysForMonth(year: number, month: number): Array<{ date: Date; otherMonth: boolean; events: CalendarEvent[] }> {
    const daysInMonth = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calculate the first and last day of the week for the month
    let startDay = firstDayOfMonth.getDay(); // day of the week for the 1st of the month
    const endDay = lastDayOfMonth.getDate(); // total days in the month

    for (let i = 0; i < startDay; i++) {
      daysInMonth.push({ date: new Date(year, month, -i), otherMonth: true, events: [] }); // previous month's days
    }

    // Adding current month's days
    for (let i = 1; i <= endDay; i++) {
      const day = new Date(year, month, i);
      const eventsForDay = this.getEventsForDate(day);
      daysInMonth.push({ date: day, otherMonth: false, events: eventsForDay });
    }

    return daysInMonth;
  }

  generateWeekDays(startDate: Date) {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDays.push({ date: day, events: [] });  // Add events as needed
    }
    return weekDays;
  }
  
  generateDaySlots(day: Date): Array<{ time: string, events: CalendarEvent[] }> {
    const startOfDay = new Date(day.setHours(0, 0, 0, 0)); // Start at midnight
    return Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(startOfDay);
      hour.setHours(i); // Set each slot's time
      const timeString = hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as "HH:mm"
      
      // Filter and return events for this hour
      return { time: timeString, events: [] }; // Return events for this time slot
    });
  }

  getMonthName(monthIndex: number) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => this.isSameDay(event.start, date));
  }

  // Check if two dates are the same day
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
  
}
