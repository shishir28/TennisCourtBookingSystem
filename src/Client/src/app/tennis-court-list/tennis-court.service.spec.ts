import { TestBed } from '@angular/core/testing';

import { TennisCourtService } from './tennis-court.service';

describe('TennisCourtService', () => {
  let service: TennisCourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennisCourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
