import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnCalendarModuleComponent } from './hn-calendar-module.component';

describe('HnCalendarModuleComponent', () => {
  let component: HnCalendarModuleComponent;
  let fixture: ComponentFixture<HnCalendarModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnCalendarModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HnCalendarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
