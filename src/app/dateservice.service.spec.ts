import { TestBed, inject } from '@angular/core/testing';

import { DateserviceService } from './dateservice.service';

describe('DateserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateserviceService]
    });
  });

  it('should ...', inject([DateserviceService], (service: DateserviceService) => {
    expect(service).toBeTruthy();
  }));
});
