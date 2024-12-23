import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HnCalendarModuleComponent } from './hn-calendar-module.component';
import { DayViewComponent } from './Components/day-view/day-view.component';
import { WeekViewComponent } from './Components/week-view/week-view.component';
import { MonthViewComponent } from './Components/month-view/month-view.component';
import { CalendarNavigationComponent } from './Components/calendar-navigation/calendar-navigation.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventModalComponent } from './Components/event-modal/event-modal.component';
import { InfoTooltipComponent } from './Components/info-tooltip/info-tooltip.component';

@NgModule({
  declarations: [
    HnCalendarModuleComponent,
    DayViewComponent,
    WeekViewComponent,
    MonthViewComponent,
    CalendarNavigationComponent,
    EventModalComponent,
    InfoTooltipComponent,
  ],
  imports: [
    CommonModule,
    DatePipe,
    FormsModule
  ],
  exports: [
    HnCalendarModuleComponent,
    MonthViewComponent,
    DayViewComponent,
    WeekViewComponent,
  ]
})
export class HnCalendarModule { }
