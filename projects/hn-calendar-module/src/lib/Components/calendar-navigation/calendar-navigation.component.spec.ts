import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNavigationComponent } from './calendar-navigation.component';

describe('CalendarNavigationComponent', () => {
  let component: CalendarNavigationComponent;
  let fixture: ComponentFixture<CalendarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
