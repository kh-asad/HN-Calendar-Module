import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.css']
})
export class CalendarNavigationComponent implements OnInit {

  @Output() navigateToNext = new EventEmitter<void>();
  @Output() navigateToPrevious = new EventEmitter<void>();

  

  constructor() { }

  ngOnInit(): void {
  }

  navigate(direction: 'prev' | 'next') {
    direction === 'prev' ? this.navigateToPrevious.emit() : this.navigateToNext.emit();
  }

}
