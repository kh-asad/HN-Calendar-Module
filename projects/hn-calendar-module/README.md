
# HN Calendar Module

The HN Calendar Module is an Angular library that provides customizable calendar components with day, week, and month views. It allows users to add events, display them in the calendar, and bind custom modals or event handlers for interaction.


## Features

- Day, Week, and Month Views: Switch between views to display events.
- Event Management: Add and view events directly in the calendar.
- Customizable Modals: Use the built-in modal or bind your own custom modal for adding events.
- Dynamic Event Display: Pass events dynamically via [events] input.







## Installation

Install my-project with npm

```bash
  npm install hn-calendar-module
```
    
## Usage/Examples

```Angular
import { HnCalendarModule } from 'hn-calendar-module';

@NgModule({
  imports: [
    ...,
    HnCalendarModule
  ],
  ...
})
export class AppModule {}
```

```
<hn-calendar-month></hn-calendar-month>
```

```
<hn-calendar-week></hn-calendar-week>
```
```
<hn-calendar-day></hn-calendar-day>
```
## Configurations
### Input: [events]
Pass an array of events to the calendar using the [events] input. Each event should conform to the following structure:

```
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;        // Event start date/time
  end?: Date;         // (Optional) Event end date/time
  description?: string; // (Optional) Description of the event
  color?: string;      // (Optional) Custom background color
}
```
#### Example:
```
events = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date('2024-11-11T10:00:00'),
    end: new Date('2024-11-11T11:00:00'),
    description: 'Discuss project updates',
    color: '#4caf50'
  },
  {
    id: 2,
    title: 'Client Call',
    start: new Date('2024-11-12T14:00:00'),
    color: '#ff5722'
  }
];
```

### Output: (slotClicked)
Use the (slotClicked) event to handle clicks on calendar slots. This can be used to open a modal or trigger custom logic.

#### Example:
```
<hn-calendar-day [events]="calendarEvents" (slotClicked)="openCustomModal($event)"></hn-calendar-day>
```
## License

This library is licensed under the MIT License.

