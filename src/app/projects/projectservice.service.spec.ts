import { TestBed, inject } from '@angular/core/testing';

import { ProjectserviceService } from './projectservice.service';

describe('ProjectserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectserviceService]
    });
  });

  it('should ...', inject([ProjectserviceService], (service: ProjectserviceService) => {
    expect(service).toBeTruthy();
  }));
});
