import { TestBed } from '@angular/core/testing';

import { AllSchedulesService } from './all-schedules.service';

describe('AllSchedulesService', () => {
  let service: AllSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
