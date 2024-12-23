import { TestBed } from '@angular/core/testing';

import { HnCalendarModuleService } from './hn-calendar-module.service';

describe('HnCalendarModuleService', () => {
  let service: HnCalendarModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HnCalendarModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
