import { TestBed } from '@angular/core/testing';

import { DefaultProfileService } from './default-profile.service';

describe('DefaultProfileService', () => {
  let service: DefaultProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
