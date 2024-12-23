import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from './Models/calendar-event';

@Component({
  selector: 'hn-calendar',
  template: `
    <div class="calendar-container">
      <div class="calendar-navigation">
        <!-- Dropdown for selecting the view -->
        <select id="view-selector" [(ngModel)]="currentView">
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <!-- Dynamically display the selected view component -->
      <hn-calendar-day *ngIf="currentView === 'day'" [events]="events"></hn-calendar-day>
      <hn-calendar-week *ngIf="currentView === 'week'" [events]="events"></hn-calendar-week>
      <hn-calendar-month *ngIf="currentView === 'month'" [events]="events"></hn-calendar-month>
    </div>
  `,
  styles: [
  ]
})
export class HnCalendarModuleComponent implements OnInit {
  currentView: string = 'month'; // Default view is month
  @Input() events: CalendarEvent[] = [];

  constructor() {}

  ngOnInit(): void {}

}